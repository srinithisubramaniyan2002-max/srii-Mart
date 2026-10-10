package com.srinidhimart.service;

import com.srinidhimart.dto.OrderItemRequest;
import com.srinidhimart.dto.OrderRequest;
import com.srinidhimart.exception.BadRequestException;
import com.srinidhimart.exception.ResourceNotFoundException;
import com.srinidhimart.model.*;
import com.srinidhimart.repository.CartItemRepository;
import com.srinidhimart.repository.OrderRepository;
import com.srinidhimart.repository.ProductRepository;
import com.srinidhimart.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository,
                        UserRepository userRepository, CartItemRepository cartItemRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order cannot be placed without items.");
        }

        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }

        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setUser(user);
        order.setCustomerName(request.getCustomerName().trim());
        order.setCustomerEmail(request.getCustomerEmail().trim());
        order.setCustomerPhone(request.getCustomerPhone().trim());
        order.setShippingAddress(request.getShippingAddress().trim());
        order.setCity(request.getCity().trim());
        order.setState(request.getState().trim());
        order.setPincode(request.getPincode().trim());
        order.setPaymentMethod(request.getPaymentMethod());
        order.setPaymentStatus("COMPLETED");
        order.setOrderStatus(OrderStatus.CONFIRMED);

        BigDecimal subtotal = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemReq.getProductId()));

            BigDecimal itemSubtotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);

            OrderItem orderItem = new OrderItem(
                    product,
                    product.getName(),
                    product.getImageUrl(),
                    product.getPrice(),
                    itemReq.getQuantity(),
                    itemSubtotal
            );
            order.addItem(orderItem);

            // Deduct stock if available
            if (product.getStock() >= itemReq.getQuantity()) {
                product.setStock(product.getStock() - itemReq.getQuantity());
                productRepository.save(product);
            }
        }

        order.setSubtotal(subtotal);

        // Tax calculation (5% GST for demonstration)
        BigDecimal taxRate = new BigDecimal("0.05");
        BigDecimal taxAmount = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        order.setTaxAmount(taxAmount);

        // Shipping fee (Free shipping for orders above ₹999)
        BigDecimal shippingFee = subtotal.compareTo(new BigDecimal("999")) >= 0 ? BigDecimal.ZERO : new BigDecimal("99.00");
        order.setShippingFee(shippingFee);

        // Discount calculation
        BigDecimal discountAmount = request.getDiscountAmount() != null ? request.getDiscountAmount() : BigDecimal.ZERO;
        order.setDiscountAmount(discountAmount);

        // Total amount = Subtotal + Tax + Shipping - Discount
        BigDecimal total = subtotal.add(taxAmount).add(shippingFee).subtract(discountAmount);
        if (total.compareTo(BigDecimal.ZERO) < 0) {
            total = BigDecimal.ZERO;
        }
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        // Clear cart if placed by a registered user
        if (user != null) {
            cartItemRepository.deleteByUserId(user.getId());
        }

        return savedOrder;
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional(readOnly = true)
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }

    @Transactional(readOnly = true)
    public Order getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with order number: " + orderNumber));
    }

    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        int randomDigits = 1000 + new Random().nextInt(9000);
        return "SNM-" + timestamp.substring(2, 8) + "-" + randomDigits;
    }
}
