-- Tạo CSDL
CREATE DATABASE IF NOT EXISTS Train_Ticket_Sale;
USE Train_Ticket_Sale;

-- Tạo bảng users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    dateOfBirth DATETIME NOT NULL,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STAFF', 'USER') DEFAULT 'USER',
    refToken VARCHAR(255) NULL
);

-- Tạo bảng stations
CREATE TABLE stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    name VARCHAR(255) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Tạo bảng trains
CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    train_type ENUM('fast', 'slow', 'normal') DEFAULT 'normal',
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Tạo bảng carriages
CREATE TABLE carriages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    carriage_type ENUM('vip', 'normal') DEFAULT 'normal',
    carriage_number INT NOT NULL,
    capacity INT NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    trainId INT NULL,
    FOREIGN KEY (trainId) REFERENCES trains(id)
);

-- Tạo bảng seats
CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    seat_type ENUM('vip', 'normal') DEFAULT 'normal',
    seat_number INT NOT NULL,
    is_available TINYINT DEFAULT 1,
    carriageId INT NULL,
    FOREIGN KEY (carriageId) REFERENCES carriages(id)
);

-- Tạo bảng schedules
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    trainId INT NOT NULL,
    departure_station_id INT NOT NULL,
    arrival_station_id INT NOT NULL,
    FOREIGN KEY (trainId) REFERENCES trains(id),
    FOREIGN KEY (departure_station_id) REFERENCES stations(id),
    FOREIGN KEY (arrival_station_id) REFERENCES stations(id)
);

-- Tạo bảng tickets
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    ticket_type ENUM('child_under_6', 'child_under_18', 'adult', 'senior') DEFAULT 'adult',
    ticket_status ENUM('available', 'booked') DEFAULT 'available',
    scheduleId INT NULL,
    seatId INT NULL,
    FOREIGN KEY (scheduleId) REFERENCES schedules(id),
    FOREIGN KEY (seatId) REFERENCES seats(id)
);

-- Tạo bảng bookings
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy JSON NULL,
    updatedBy JSON NULL,
    deletedBy JSON NULL,
    createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    updatedAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    deletedAt TIMESTAMP(6) NULL,
    isDeleted TINYINT DEFAULT 0,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'canceled') DEFAULT 'pending',
    userId INT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);


-- Dữ liệu cho bảng `trains`
INSERT INTO trains (name, code, train_type, status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
('Fast Express 1', 'FAST001', 'fast', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Fast Express 2', 'FAST002', 'fast', 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Slow Line 1', 'SLOW001', 'slow', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Slow Line 2', 'SLOW002', 'slow', 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Normal Express 1', 'NORM001', 'normal', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Normal Express 2', 'NORM002', 'normal', 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `stations`
INSERT INTO stations (name, location, status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
('Hanoi Central', 'Hanoi', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Ho Chi Minh Station', 'Ho Chi Minh', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Da Nang Terminal', 'Da Nang', 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Hai Phong Station', 'Hai Phong', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
('Can Tho Station', 'Can Tho', 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `carriages`
INSERT INTO carriages (trainId, carriage_type, carriage_number, capacity, status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
(1, 'vip', 1, 30, 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(1, 'normal', 2, 50, 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, 'vip', 1, 20, 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(3, 'normal', 3, 40, 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(4, 'vip', 2, 25, 'inactive', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `seats`
INSERT INTO seats (carriageId, seat_type, seat_number, is_available, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
(1, 'vip', 1, true, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(1, 'vip', 2, false, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, 'normal', 3, true, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, 'normal', 4, false, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(3, 'vip', 5, true, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(4, 'normal', 6, false, '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `schedules`
INSERT INTO schedules (trainId, departure_station_id, arrival_station_id, departure_time, arrival_time, status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
(1, 1, 2, '2025-02-14 08:00:00', '2025-02-14 18:00:00', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, 2, 3, '2025-02-15 09:00:00', '2025-02-15 15:00:00', 'completed', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(3, 1, 3, '2025-02-16 10:00:00', '2025-02-16 16:00:00', 'canceled', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(4, 4, 5, '2025-02-17 11:00:00', '2025-02-17 20:00:00', 'active', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `bookings`
INSERT INTO bookings (userId, booking_time, status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
(1, NOW(), 'pending', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, NOW(), 'confirmed', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(3, NOW(), 'canceled', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(4, NOW(), 'pending', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(5, NOW(), 'confirmed', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);

-- Dữ liệu cho bảng `tickets`
INSERT INTO tickets (scheduleId, seatId, price, ticket_type, ticket_status, createdBy, isDeleted, deletedAt, createdAt, updatedAt, updatedBy)
VALUES
(1, 1, 100.00, 'child_under_6', 'available', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(2, 2, 150.00, 'adult', 'booked', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(3, 3, 120.00, 'senior', 'available', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(4, 4, 90.00, 'child_under_18', 'available', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL),
(1, 5, 200.00, 'adult', 'booked', '{"userId": 1}', false, NULL, NOW(), NOW(), NULL);
