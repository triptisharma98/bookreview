-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 03, 2023 at 06:10 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookReviews`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookreviewrating`
--

CREATE TABLE `bookreviewrating` (
  `id` int(11) NOT NULL,
  `ReviewDetials` varchar(2000) NOT NULL,
  `Ratings` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `BookID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookreviewrating`
--

INSERT INTO `bookreviewrating` (`id`, `ReviewDetials`, `Ratings`, `UserID`, `BookID`) VALUES
(1, 'This is a testing review detail', 4, 2, 2),
(2, 'This is also a testing review', 4, 2, 2),
(3, 'Test Review', 4, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `BookID` int(11) NOT NULL,
  `BookName` varchar(500) NOT NULL,
  `BookAuthor` varchar(500) NOT NULL,
  `PublishDate` varchar(191) DEFAULT NULL,
  `BookDescription` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`BookID`, `BookName`, `BookAuthor`, `PublishDate`, `BookDescription`) VALUES
(2, 'CS101 Introduction to Computing', 'Albert Fahad', '2023-02-02', 'This is description of this book'),
(3, 'CS201 Introduction to Programming', 'Albert Usman', '2023-02-04', 'This is test Description');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserName` varchar(500) NOT NULL,
  `UserID` int(11) NOT NULL,
  `UserEmail` varchar(500) NOT NULL,
  `UserPassword` varchar(500) NOT NULL,
  `UserType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserName`, `UserID`, `UserEmail`, `UserPassword`, `UserType`) VALUES
('Admin', 1, 'admin@gmail.com', 'abc123', 0),
('User', 2, 'user@gmail.com', 'abc123', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookreviewrating`
--
ALTER TABLE `bookreviewrating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BookID` (`BookID`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`BookID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookreviewrating`
--
ALTER TABLE `bookreviewrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `BookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookreviewrating`
--
ALTER TABLE `bookreviewrating`
  ADD CONSTRAINT `bookreviewrating_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `bookreviewrating_ibfk_2` FOREIGN KEY (`BookID`) REFERENCES `books` (`BookID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
