DROP DATABASE IF EXISTS `db_e-commerce`;

CREATE DATABASE `db_e-commerce`;

USE `db_e-commerce`;

CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `role` enum('admin', 'user') NOT NULL DEFAULT 'user',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `product_types` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `type_id` int(11) NOT NULL,
    `price` decimal(10, 2) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`type_id`) REFERENCES `product_types` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `orders` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `total` decimal(10, 2) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `order_products` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `order_id` int(11) NOT NULL,
    `product_id` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- Path: backend/resources/db_e-commerce.sql