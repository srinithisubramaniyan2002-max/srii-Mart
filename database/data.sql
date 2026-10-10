-- ====================================================================
-- Srinidhi Mart - Initial Sample Data
-- Database: srinidhi_mart
-- ====================================================================

USE `srinidhi_mart`;

-- 1. Insert Sample Users
-- Note: Passwords are encrypted with BCrypt (password123 and admin123)
-- Hash for 'password123': $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi
-- Hash for 'admin123':    $2a$10$e886w/pLh7jGjS9oZ3L0e.6M4LzXhP5gB1Fq9Z7rQ2X6q8K9m0Ytu
INSERT INTO `users` (`name`, `email`, `password`, `phone`, `address`, `role`)
VALUES
('Rahul Sharma', 'user@srinidhimart.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', '+91 9876543210', 'Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103', 'ROLE_USER'),
('Admin Srinidhi', 'admin@srinidhimart.com', '$2a$10$e886w/pLh7jGjS9oZ3L0e.6M4LzXhP5gB1Fq9Z7rQ2X6q8K9m0Ytu', '+91 9123456789', 'Srinidhi Mart HQ, Indiranagar, Bengaluru, Karnataka - 560038', 'ROLE_ADMIN');

-- 2. Insert Sample Mobile Products
INSERT INTO `products` 
(`name`, `brand`, `model`, `description`, `price`, `original_price`, `discount_percent`, `stock`, `image_url`, `rating`, `rating_count`, `ram`, `storage`, `battery`, `camera`, `processor`, `is_featured`)
VALUES
-- 1. Apple iPhone 15 Pro Max
(
  'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium',
  'Apple',
  'iPhone 15 Pro Max',
  'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x Telephoto optical zoom.',
  154900.00,
  159900.00,
  3,
  25,
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
  4.8,
  342,
  '8 GB',
  '256 GB',
  '4422 mAh',
  '48MP Main + 12MP Ultra-Wide + 12MP 5x Telephoto',
  'A17 Pro Bionic (3nm)',
  TRUE
),

-- 2. Samsung Galaxy S24 Ultra
(
  'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB Storage) - Titanium Gray',
  'Samsung',
  'Galaxy S24 Ultra',
  'Welcome to the era of mobile AI with Galaxy AI. Armor Aluminum frame, built-in S Pen, 200MP camera with Quad Telephoto system, and Snapdragon 8 Gen 3 for Galaxy.',
  129999.00,
  134999.00,
  4,
  30,
  'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
  4.9,
  518,
  '12 GB',
  '256 GB',
  '5000 mAh',
  '200MP + 50MP + 12MP + 10MP with 100x Space Zoom',
  'Snapdragon 8 Gen 3 for Galaxy',
  TRUE
),

-- 3. OnePlus 12
(
  'OnePlus 12 5G (16GB RAM, 512GB Storage) - Flowy Emerald',
  'OnePlus',
  'OnePlus 12',
  'Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 2K 120Hz ProXDR display, and 100W SUPERVOOC ultra-fast charging.',
  69999.00,
  74999.00,
  7,
  40,
  'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
  4.7,
  280,
  '16 GB',
  '512 GB',
  '5400 mAh',
  '50MP Sony LYT-808 + 64MP 3x Periscope + 48MP UW',
  'Snapdragon 8 Gen 3',
  TRUE
),

-- 4. Google Pixel 8 Pro
(
  'Google Pixel 8 Pro (12GB RAM, 128GB Storage) - Bay Blue',
  'Google',
  'Pixel 8 Pro',
  'Google Tensor G3 chip engineered with Google AI for cutting-edge photo and video features like Best Take, Audio Magic Eraser, and all-day battery life.',
  93999.00,
  106999.00,
  12,
  20,
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  4.6,
  194,
  '12 GB',
  '128 GB',
  '5050 mAh',
  '50MP Octa PD + 48MP Quad PD UW + 48MP 5x Telephoto',
  'Google Tensor G3',
  TRUE
),

-- 5. Apple iPhone 15
(
  'Apple iPhone 15 (128 GB) - Blue',
  'Apple',
  'iPhone 15',
  'Dynamic Island bubbles up alerts and Live Activities. 48MP Main camera with 2x Telephoto, durable color-infused glass, and USB-C connectivity.',
  71999.00,
  79900.00,
  10,
  35,
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
  4.7,
  410,
  '6 GB',
  '128 GB',
  '3349 mAh',
  '48MP Main + 12MP Ultra Wide with 2x Optical Zoom',
  'A16 Bionic',
  FALSE
),

-- 6. Samsung Galaxy S24
(
  'Samsung Galaxy S24 5G (8GB RAM, 128GB Storage) - Cobalt Violet',
  'Samsung',
  'Galaxy S24',
  'Compact flagship powerhouse with stunning 6.2-inch Dynamic AMOLED 2X 120Hz display, Galaxy AI assistance, Circle to Search, and brilliant nightography.',
  74999.00,
  79999.00,
  6,
  30,
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
  4.6,
  165,
  '8 GB',
  '128 GB',
  '4000 mAh',
  '50MP Wide + 10MP 3x Telephoto + 12MP Ultra Wide',
  'Exynos 2400 / Snapdragon 8 Gen 3',
  FALSE
),

-- 7. Nothing Phone (2)
(
  'Nothing Phone (2) 5G (12GB RAM, 256GB Storage) - Dark Grey',
  'Nothing',
  'Phone (2)',
  'Iconic Glyph Interface with customized LED sequences, Snapdragon 8+ Gen 1 chipset, 50MP dual rear camera with Sony sensors, and clean Nothing OS 2.5.',
  36999.00,
  49999.00,
  26,
  45,
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
  4.5,
  310,
  '12 GB',
  '256 GB',
  '4700 mAh',
  '50MP Sony IMX890 + 50MP Samsung JN1 Ultra-Wide',
  'Qualcomm Snapdragon 8+ Gen 1',
  TRUE
),

-- 8. OnePlus Nord CE4
(
  'OnePlus Nord CE4 5G (8GB RAM, 128GB Storage) - Celadon Marble',
  'OnePlus',
  'Nord CE4',
  'Snapdragon 7 Gen 3 performance, 100W SUPERVOOC flash charge, 5500 mAh battery, and Sony LYT-600 50MP camera with OIS. Incredible value champion.',
  24999.00,
  26999.00,
  7,
  60,
  'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
  4.4,
  520,
  '8 GB',
  '128 GB',
  '5500 mAh',
  '50MP Sony LYT-600 with OIS + 8MP Ultra Wide',
  'Snapdragon 7 Gen 3',
  FALSE
),

-- 9. Xiaomi 14
(
  'Xiaomi 14 5G (12GB RAM, 512GB Storage) - Jade Green',
  'Xiaomi',
  'Xiaomi 14',
  'Leica Summilux optical lens with Light Fusion 900 sensor, Snapdragon 8 Gen 3 processor, 1.5K 120Hz LTPO AMOLED, 90W HyperCharge, and 50W wireless charge.',
  69999.00,
  79999.00,
  12,
  22,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  4.6,
  180,
  '12 GB',
  '512 GB',
  '4610 mAh',
  '50MP Leica Main + 50MP 75mm Floating Telephoto + 50MP UW',
  'Snapdragon 8 Gen 3',
  FALSE
),

-- 10. Vivo X100
(
  'Vivo X100 5G (16GB RAM, 512GB Storage) - Stargaze Blue',
  'Vivo',
  'X100',
  'Co-engineered with ZEISS optics featuring ZEISS APO Telephoto camera, MediaTek Dimensity 9300 flagship processor, and 120W Dual-Cell FlashCharge.',
  63999.00,
  69999.00,
  8,
  18,
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
  4.7,
  140,
  '16 GB',
  '512 GB',
  '5000 mAh',
  '50MP VCS True Color + 64MP ZEISS Telephoto + 50MP UW',
  'MediaTek Dimensity 9300',
  FALSE
),

-- 11. Realme 12 Pro+ 5G
(
  'Realme 12 Pro+ 5G (12GB RAM, 256GB Storage) - Submarine Blue',
  'Realme',
  '12 Pro+',
  'Luxury watch design by Ollivier Saveo, flagship 64MP Periscope Portrait camera with 120x SuperZoom, and 120Hz curved AMOLED display.',
  29999.00,
  33999.00,
  12,
  50,
  'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80',
  4.4,
  380,
  '12 GB',
  '256 GB',
  '5000 mAh',
  '64MP Periscope + 50MP Sony IMX890 + 8MP Ultra Wide',
  'Snapdragon 7s Gen 2',
  FALSE
),

-- 12. Google Pixel 8a
(
  'Google Pixel 8a (8GB RAM, 128GB Storage) - Aloe',
  'Google',
  'Pixel 8a',
  'Google Tensor G3, Actua display with 120Hz refresh, all-day battery, IP67 water and dust resistance, and 7 years of Pixel drops and OS updates.',
  49999.00,
  52999.00,
  6,
  35,
  'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
  4.5,
  210,
  '8 GB',
  '128 GB',
  '4492 mAh',
  '64MP Quad PD Wide + 13MP Ultra Wide',
  'Google Tensor G3',
  FALSE
);
