package com.srinidhimart.config;

import com.srinidhimart.model.Product;
import com.srinidhimart.model.Role;
import com.srinidhimart.model.User;
import com.srinidhimart.repository.ProductRepository;
import com.srinidhimart.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ProductRepository productRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        initUsers();
        initProducts();
    }

    private void initUsers() {
        if (userRepository.count() == 0) {
            User demoUser = new User(
                    "Rahul Sharma",
                    "user@srinidhimart.com",
                    passwordEncoder.encode("password123"),
                    "+91 9876543210",
                    "Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103",
                    Role.ROLE_USER
            );

            User demoAdmin = new User(
                    "Admin Srinidhi",
                    "admin@srinidhimart.com",
                    passwordEncoder.encode("admin123"),
                    "+91 9123456789",
                    "Srinidhi Mart HQ, 100 Feet Road, Indiranagar, Bengaluru, Karnataka - 560038",
                    Role.ROLE_ADMIN
            );

            userRepository.saveAll(Arrays.asList(demoUser, demoAdmin));
            System.out.println(">>> [Srinidhi Mart] Sample users created successfully (user@srinidhimart.com / password123).");
        }
    }

    private void initProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = Arrays.asList(
                    new Product(
                            "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
                            "Apple",
                            "iPhone 15 Pro Max",
                            "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x Telephoto optical zoom.",
                            new BigDecimal("154900.00"),
                            new BigDecimal("159900.00"),
                            3,
                            25,
                            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
                            4.8,
                            342,
                            "8 GB",
                            "256 GB",
                            "4422 mAh",
                            "48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto",
                            "A17 Pro Bionic (3nm)",
                            true
                    ),
                    new Product(
                            "Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB Storage) - Titanium Gray",
                            "Samsung",
                            "Galaxy S24 Ultra",
                            "Welcome to the era of mobile AI with Galaxy AI. Armor Aluminum frame, built-in S Pen, 200MP camera with Quad Telephoto system, and Snapdragon 8 Gen 3 for Galaxy.",
                            new BigDecimal("129999.00"),
                            new BigDecimal("134999.00"),
                            4,
                            30,
                            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
                            4.9,
                            518,
                            "12 GB",
                            "256 GB",
                            "5000 mAh",
                            "200MP + 50MP + 12MP + 10MP with 100x Space Zoom",
                            "Snapdragon 8 Gen 3 for Galaxy",
                            true
                    ),
                    new Product(
                            "OnePlus 12 5G (16GB RAM, 512GB Storage) - Flowy Emerald",
                            "OnePlus",
                            "OnePlus 12",
                            "Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 2K 120Hz ProXDR display, and 100W SUPERVOOC ultra-fast charging.",
                            new BigDecimal("69999.00"),
                            new BigDecimal("74999.00"),
                            7,
                            40,
                            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
                            4.7,
                            280,
                            "16 GB",
                            "512 GB",
                            "5400 mAh",
                            "50MP Sony LYT-808 + 64MP 3x Periscope + 48MP UW",
                            "Snapdragon 8 Gen 3",
                            true
                    ),
                    new Product(
                            "Google Pixel 8 Pro (12GB RAM, 128GB Storage) - Bay Blue",
                            "Google",
                            "Pixel 8 Pro",
                            "Google Tensor G3 chip engineered with Google AI for cutting-edge photo and video features like Best Take, Audio Magic Eraser, and all-day battery life.",
                            new BigDecimal("93999.00"),
                            new BigDecimal("106999.00"),
                            12,
                            20,
                            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
                            4.6,
                            194,
                            "12 GB",
                            "128 GB",
                            "5050 mAh",
                            "50MP Octa PD + 48MP Quad PD UW + 48MP 5x Telephoto",
                            "Google Tensor G3",
                            true
                    ),
                    new Product(
                            "Apple iPhone 15 (128 GB) - Blue",
                            "Apple",
                            "iPhone 15",
                            "Dynamic Island bubbles up alerts and Live Activities. 48MP Main camera with 2x Telephoto, durable color-infused glass, and USB-C connectivity.",
                            new BigDecimal("71999.00"),
                            new BigDecimal("79900.00"),
                            10,
                            35,
                            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
                            4.7,
                            410,
                            "6 GB",
                            "128 GB",
                            "3349 mAh",
                            "48MP Main + 12MP Ultra Wide with 2x Optical Zoom",
                            "A16 Bionic",
                            false
                    ),
                    new Product(
                            "Samsung Galaxy S24 5G (8GB RAM, 128GB Storage) - Cobalt Violet",
                            "Samsung",
                            "Galaxy S24",
                            "Compact flagship powerhouse with stunning 6.2-inch Dynamic AMOLED 2X 120Hz display, Galaxy AI assistance, Circle to Search, and brilliant nightography.",
                            new BigDecimal("74999.00"),
                            new BigDecimal("79999.00"),
                            6,
                            30,
                            "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
                            4.6,
                            165,
                            "8 GB",
                            "128 GB",
                            "4000 mAh",
                            "50MP Wide + 10MP 3x Telephoto + 12MP Ultra Wide",
                            "Snapdragon 8 Gen 3",
                            false
                    ),
                    new Product(
                            "Nothing Phone (2) 5G (12GB RAM, 256GB Storage) - Dark Grey",
                            "Nothing",
                            "Phone (2)",
                            "Iconic Glyph Interface with customized LED sequences, Snapdragon 8+ Gen 1 chipset, 50MP dual rear camera with Sony sensors, and clean Nothing OS 2.5.",
                            new BigDecimal("36999.00"),
                            new BigDecimal("49999.00"),
                            26,
                            45,
                            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
                            4.5,
                            310,
                            "12 GB",
                            "256 GB",
                            "4700 mAh",
                            "50MP Sony IMX890 + 50MP Samsung JN1 Ultra-Wide",
                            "Snapdragon 8+ Gen 1",
                            true
                    ),
                    new Product(
                            "OnePlus Nord CE4 5G (8GB RAM, 128GB Storage) - Celadon Marble",
                            "OnePlus",
                            "Nord CE4",
                            "Snapdragon 7 Gen 3 performance, 100W SUPERVOOC flash charge, 5500 mAh battery, and Sony LYT-600 50MP camera with OIS. Incredible value champion.",
                            new BigDecimal("24999.00"),
                            new BigDecimal("26999.00"),
                            7,
                            60,
                            "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
                            4.4,
                            520,
                            "8 GB",
                            "128 GB",
                            "5500 mAh",
                            "50MP Sony LYT-600 with OIS + 8MP Ultra Wide",
                            "Snapdragon 7 Gen 3",
                            false
                    ),
                    new Product(
                            "Xiaomi 14 5G (12GB RAM, 512GB Storage) - Jade Green",
                            "Xiaomi",
                            "Xiaomi 14",
                            "Leica Summilux optical lens with Light Fusion 900 sensor, Snapdragon 8 Gen 3 processor, 1.5K 120Hz LTPO AMOLED, 90W HyperCharge, and 50W wireless charge.",
                            new BigDecimal("69999.00"),
                            new BigDecimal("79999.00"),
                            12,
                            22,
                            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
                            4.6,
                            180,
                            "12 GB",
                            "512 GB",
                            "4610 mAh",
                            "50MP Leica Main + 50MP 75mm Floating Telephoto + 50MP UW",
                            "Snapdragon 8 Gen 3",
                            false
                    ),
                    new Product(
                            "Vivo X100 5G (16GB RAM, 512GB Storage) - Stargaze Blue",
                            "Vivo",
                            "X100",
                            "Co-engineered with ZEISS optics featuring ZEISS APO Telephoto camera, MediaTek Dimensity 9300 flagship processor, and 120W Dual-Cell FlashCharge.",
                            new BigDecimal("63999.00"),
                            new BigDecimal("69999.00"),
                            8,
                            18,
                            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
                            4.7,
                            140,
                            "16 GB",
                            "512 GB",
                            "5000 mAh",
                            "50MP VCS True Color + 64MP ZEISS Telephoto + 50MP UW",
                            "MediaTek Dimensity 9300",
                            false
                    ),
                    new Product(
                            "Realme 12 Pro+ 5G (12GB RAM, 256GB Storage) - Submarine Blue",
                            "Realme",
                            "12 Pro+",
                            "Luxury watch design by Ollivier Saveo, flagship 64MP Periscope Portrait camera with 120x SuperZoom, and 120Hz curved AMOLED display.",
                            new BigDecimal("29999.00"),
                            new BigDecimal("33999.00"),
                            12,
                            50,
                            "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
                            4.4,
                            380,
                            "12 GB",
                            "256 GB",
                            "5000 mAh",
                            "64MP Periscope + 50MP Sony IMX890 + 8MP Ultra Wide",
                            "Snapdragon 7s Gen 2",
                            false
                    ),
                    new Product(
                            "Google Pixel 8a (8GB RAM, 128GB Storage) - Aloe",
                            "Google",
                            "Pixel 8a",
                            "Google Tensor G3, Actua display with 120Hz refresh, all-day battery, IP67 water and dust resistance, and 7 years of Pixel drops and OS updates.",
                            new BigDecimal("49999.00"),
                            new BigDecimal("52999.00"),
                            6,
                            35,
                            "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
                            4.5,
                            210,
                            "8 GB",
                            "128 GB",
                            "4492 mAh",
                            "64MP Quad PD Wide + 13MP Ultra Wide",
                            "Google Tensor G3",
                            false
                    )
            );

            productRepository.saveAll(products);
            System.out.println(">>> [Srinidhi Mart] 12 Mobile phone products seeded into database successfully!");
        }
    }
}
