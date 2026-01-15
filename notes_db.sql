-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2026 at 10:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `isArchived` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `isArchived`, `createdAt`, `updatedAt`, `userId`) VALUES
(2, 'Groceries', 'Buy groceries by Saturday', 0, '2025-11-06 22:56:24.849945', '2025-11-06 22:56:24.849945', 1),
(3, 'Pay internet bill before end of month', 'PLDT - 1699\nGlobe - 9699', 0, '2025-11-06 22:57:02.419274', '2025-11-06 22:57:02.419274', 1),
(4, 'BDO Loan Payment', 'Pay BDO loan of 20,000PHP', 1, '2025-11-06 23:15:09.215777', '2025-11-06 23:15:12.000000', 1),
(6, 'Solar Array', 'Re-assess for safety checks, maintenance', 0, '2026-01-16 04:56:46.494924', '2026-01-16 04:56:46.494924', 2),
(7, 'Engine Swap', 'Look for possible engines for the Nissan R33 GTR', 1, '2026-01-16 04:57:38.347115', '2026-01-16 04:58:48.000000', 2),
(8, 'BDO Utang', '26000', 0, '2026-01-16 04:58:03.876425', '2026-01-16 04:58:09.000000', 2),
(9, 'Canvassed items', 'Viewsonic 36\" - 5,000\nNvision sa SM - 9000\nSony headphones - 12000', 1, '2026-01-16 05:01:29.512023', '2026-01-16 05:01:30.000000', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `createdAt`, `updatedAt`) VALUES
(1, 'giulliandawal@gmail.com', '$2a$10$2eM0QQaHcWvxbomxURmXdeZ9EGF1mF9Tbahud4a32Tea2vFlDkz86', 'Giullian Marco', 'Dawal', '2025-09-30 14:23:16.627687', '2025-09-30 14:23:16.627687'),
(2, 'thegool@gmail.com', '$2a$10$XK..SEv/6JtLYDcgJ6V1xeUz/T0eZ8fC7VezYw35RETWO.k5uya4.', 'Giullian Marco', 'Dawal', '2026-01-16 00:49:08.980475', '2026-01-16 00:49:08.980475');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_829532ff766505ad7c71592c6a5` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `FK_829532ff766505ad7c71592c6a5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
