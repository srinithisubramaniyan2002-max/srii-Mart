package com.srinidhimart.service;

import com.srinidhimart.exception.ResourceNotFoundException;
import com.srinidhimart.model.Product;
import com.srinidhimart.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<Product> getAllProducts(String search, String brand, BigDecimal minPrice, BigDecimal maxPrice, String sortBy) {
        Sort sort = determineSort(sortBy);
        
        String cleanSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String cleanBrand = (brand != null && !brand.trim().isEmpty() && !brand.equalsIgnoreCase("all")) ? brand.trim() : null;

        return productRepository.searchAndFilter(cleanSearch, cleanBrand, minPrice, maxPrice, sort);
    }

    @Transactional(readOnly = true)
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mobile phone not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<String> getAllBrands() {
        return productRepository.findDistinctBrands();
    }

    @Transactional(readOnly = true)
    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }

    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    private Sort determineSort(String sortBy) {
        if (sortBy == null) {
            return Sort.by(Sort.Direction.DESC, "id");
        }
        return switch (sortBy.toLowerCase()) {
            case "price_asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating_desc" -> Sort.by(Sort.Direction.DESC, "rating");
            case "name_asc" -> Sort.by(Sort.Direction.ASC, "name");
            default -> Sort.by(Sort.Direction.DESC, "id");
        };
    }
}
