SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

USE b5rtan5c9glwe0qbklvo
/*!----------------------------*/;
/*!Table structure for users*/;
/*!----------------------------*/;
/*!--DROP TABLE IF EXISTS `users`;*/;
CREATE TABLE `users`  (
  `id` int(5) NOT NULL,
  `name` varchar(510) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(80) NULL DEFAULT NULL,
  `e_mail` varchar(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_username`(`username`),
  UNIQUE INDEX `uq_e_mail`(`e_mail`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*!----------------------------*/;
/*!Records of users*/;
/*!----------------------------*/;
INSERT INTO `users` (`id`, `name`, `username`, `password`, `e_mail`) VALUES
(1, 'Testing1 Test', 'test1', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'test1@gmail.com'),
(2, 'Testing2 Test', 'test2', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'test2@gmail.com'),
(3, 'Testing3 Test', 'test3', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'test3@gmail.com');


/*!----------------------------*/;
/*!Table structure for posts*/;
/*!----------------------------*/;
/*!--DROP TABLE IF EXISTS `posts`;*/;
CREATE TABLE `posts`  (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_published` BOOLEAN DEFAULT FALSE,
  `created_at` timestamp(0) NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id_post` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*!----------------------------*/;
/*!Records of posts*/;
/*!----------------------------*/;
INSERT INTO `posts` (`id`, `user_id`, `title`, `body`, `slug`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test1 Post1', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'test1_post1', true, '2020-10-09 00:31:57', NULL),
(2, 1, 'Test1 Post2 ', 'commodo vulputate.', 'test1_post2', false, '2020-10-09 01:25:53', NULL),
(3, 3, 'Test3 Post1', 'tincidunt eget, tempus vel, pede.', 'test3_post1', true, '2020-10-09 01:25:53', NULL);


/*!----------------------------*/;
/*!Table structure for momments*/;
/*!----------------------------*/;
/*!--DROP TABLE IF EXISTS `momments`;*/;
CREATE TABLE `comments`  (
  `id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `post_id` int(5) NOT NULL,
  `body` text NOT NULL,
  `is_published` BOOLEAN DEFAULT FALSE,  
  `created_at` timestamp(0) NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP(0),
  `updated_at` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id_comment` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_post_id_comment` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*!----------------------------*/;
/*!Records of posts*/;
/*!----------------------------*/;
INSERT INTO `comments` (`id`, `user_id`, `post_id`, `body`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Test2 comment1 in post1..........', true, '2020-10-09 00:58:57', NULL),
(2, 2, 3, 'Test2 comment2 in post3------------------------', true, '2020-10-09 01:45:53', NULL),
(3, 3, 1, 'Test3 comment3 in post1', true, '2020-10-09 09:25:53', NULL),
(4, 1, 3, 'Test3 comment3 in post3', false, '2020-10-09 04:25:53', NULL);
