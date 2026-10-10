package com.srinidhimart.controller;

import com.srinidhimart.dto.ApiResponse;
import com.srinidhimart.dto.CartItemRequest;
import com.srinidhimart.model.CartItem;
import com.srinidhimart.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItem>>> getCart(@RequestParam Long userId) {
        List<CartItem> items = cartService.getCartForUser(userId);
        return ResponseEntity.ok(ApiResponse.ok("Cart retrieved successfully", items));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartItem>> addToCart(
            @RequestParam Long userId,
            @Valid @RequestBody CartItemRequest request
    ) {
        CartItem cartItem = cartService.addToCart(userId, request.getProductId(), request.getQuantity());
        return ResponseEntity.ok(ApiResponse.ok("Item added to cart", cartItem));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ApiResponse<CartItem>> updateQuantity(
            @PathVariable Long itemId,
            @RequestParam Long userId,
            @RequestParam int quantity
    ) {
        CartItem updated = cartService.updateQuantity(userId, itemId, quantity);
        return ResponseEntity.ok(ApiResponse.ok("Cart updated", updated));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse<Void>> removeItem(
            @PathVariable Long itemId,
            @RequestParam Long userId
    ) {
        cartService.removeFromCart(userId, itemId);
        return ResponseEntity.ok(ApiResponse.ok("Item removed from cart", null));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<Void>> clearCart(@RequestParam Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok(ApiResponse.ok("Cart cleared", null));
    }
}
