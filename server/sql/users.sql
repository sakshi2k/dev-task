CREATE TABLE `Users` (   
  `id` int AUTO_INCREMENT PRIMARY KEY,   
  `FirstName` varchar(255) NOT NULL,   
  `LastName` varchar(255) NOT NULL,   
  `Email` varchar(255) NOT NULL,
  `CreatedAt` DateTime DEFAULT CURRENT_TIMESTAMP() 
);
--   `Role` ENUM('Normal','Manager') DEFAULT NULL


INSERT INTO Users
(FirstName, LastName, Email)
values
(?, ?, ?)