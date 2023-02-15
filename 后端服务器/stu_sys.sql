/*
Navicat MySQL Data Transfer

Source Server         : 1
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : stu_sys

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2023-02-14 16:35:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `headImg` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '4', '6', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '真好看', '2023/1/3 20:05:56');
INSERT INTO `comments` VALUES ('2', '4', '6', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '真的很会啊！', '2023/1/3 20:05:56');
INSERT INTO `comments` VALUES ('3', '4', '6', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '评论测试！', '2023/1/3 19:55:38');
INSERT INTO `comments` VALUES ('4', '4', '7', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '评论测试2！', '2023/1/3 19:57:12');
INSERT INTO `comments` VALUES ('5', '5', '6', '张郃', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '我觉得一般', '2023/1/3 20:05:56');
INSERT INTO `comments` VALUES ('6', '4', '6', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '评论测试！', '2023/1/9 11:37:40');
INSERT INTO `comments` VALUES ('7', '4', '7', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '测试2！', '2023/1/9 11:38:10');

-- ----------------------------
-- Table structure for hotvideo
-- ----------------------------
DROP TABLE IF EXISTS `hotvideo`;
CREATE TABLE `hotvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `video_content` varchar(255) DEFAULT NULL,
  `up_name` varchar(255) DEFAULT NULL,
  `video_time` varchar(255) DEFAULT NULL,
  `up_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hotvideo
-- ----------------------------
INSERT INTO `hotvideo` VALUES ('6', '测试4', 'videos/2022111018405611648.mp4', '鸭梨大', '2022-11-10 18:41:06', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('7', '【S12全球总决赛】淘汰赛 10月30日 JDG vs T1', 'videos/video1.mp4', '哔哩哔哩英雄联盟赛事', '2022-10-31 17:22:08', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('8', '测试视频1', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('9', '测试视频2', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('10', '测试视频3', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('11', '测试视频4', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('12', '测试视频5', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('16', '测试视频1', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('17', '一堂好课', 'videos/2022111018405611648.mp4', '追寻思想的力量', '2022-11-01 17:11:20', 'uploads/2022110114335812793.gif');
INSERT INTO `hotvideo` VALUES ('20', '测试', 'http://localhost:9999//uploadVideo/1419720221214164252fil.mp4', '赵云', '2022/12/14 16:42:55', 'http://localhost:9999//upload/1194820221205200633fil.jpg');

-- ----------------------------
-- Table structure for passvideo
-- ----------------------------
DROP TABLE IF EXISTS `passvideo`;
CREATE TABLE `passvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `video_content` varchar(255) DEFAULT NULL,
  `up_name` varchar(255) DEFAULT NULL,
  `video_time` varchar(255) DEFAULT NULL,
  `up_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of passvideo
-- ----------------------------
INSERT INTO `passvideo` VALUES ('6', '测试4', 'videos/2022111018405611648.mp4', '鸭梨大', '2022-11-10 18:41:06', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('7', '【S12全球总决赛】淘汰赛 10月30日 JDG vs T1', 'videos/video1.mp4', '哔哩哔哩英雄联盟赛事', '2022-10-31 17:22:08', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('9', '测试视频2', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('10', '测试视频3', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('11', '测试视频4', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('12', '测试视频5', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('16', '测试视频1', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('17', '一堂好课', 'videos/2022111018405611648.mp4', '追寻思想的力量', '2022-11-01 17:11:20', 'uploads/2022110114335812793.gif');
INSERT INTO `passvideo` VALUES ('20', '测试', 'http://localhost:9999//uploadVideo/1419720221214164252fil.mp4', '赵云', '2022/12/14 16:42:55', 'http://localhost:9999//upload/1194820221205200633fil.jpg');
INSERT INTO `passvideo` VALUES ('21', '测试视频9', 'http://localhost:9999//uploadVideo/1319720230109114054fil.mp4', 'admin', '2023/1/9 11:40:57', 'undefined');

-- ----------------------------
-- Table structure for reportvideo
-- ----------------------------
DROP TABLE IF EXISTS `reportvideo`;
CREATE TABLE `reportvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `video_content` varchar(255) DEFAULT NULL,
  `up_name` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `video_time` varchar(255) DEFAULT NULL,
  `up_img` varchar(255) DEFAULT NULL,
  `count` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reportvideo
-- ----------------------------
INSERT INTO `reportvideo` VALUES ('7', '【S12全球总决赛】淘汰赛 10月30日 JDG vs T1', 'videos/video1.mp4', '哔哩哔哩英雄联盟赛事', 'undefined', '2022-10-31 17:22:08', 'uploads/2022110114335812793.gif', '1');

-- ----------------------------
-- Table structure for t_student
-- ----------------------------
DROP TABLE IF EXISTS `t_student`;
CREATE TABLE `t_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(255) DEFAULT NULL COMMENT '学生名字',
  `stu_img` varchar(255) DEFAULT NULL COMMENT '学生头像',
  `stu_phone` varchar(255) DEFAULT NULL COMMENT '学生电话',
  `stu_sex` varchar(255) DEFAULT NULL COMMENT '学生性别',
  `stu_content` longtext COMMENT '学生简介',
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_student
-- ----------------------------
INSERT INTO `t_student` VALUES ('3', '王老五', 'http://localhost:9999//upload/1757520221206093121fil.jpg', '13245689', '男', '开摆', '123456');
INSERT INTO `t_student` VALUES ('4', '赵云', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '100000000', '男', '七进七出', '123456');
INSERT INTO `t_student` VALUES ('5', '张郃', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '18774138461', '男', '修改测试', '123456');
INSERT INTO `t_student` VALUES ('6', '熊大', 'http://localhost:9999//upload/1194820221205200633fil.jpg', '16541848965', '男', '熊出没', '123456');
INSERT INTO `t_student` VALUES ('7', '熊二', 'http://localhost:9999//upload/1757520221206093121fil.jpg', '16541848965', '男', '熊出没', '123456');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', '123456', 'SPadmin', '1');
INSERT INTO `t_user` VALUES ('2', '张三', '123456', null, '1');
INSERT INTO `t_user` VALUES ('3', '李四', '123456', '审核员', '1');
INSERT INTO `t_user` VALUES ('4', '王五', '123456', null, '0');
INSERT INTO `t_user` VALUES ('5', '赵六', '123456', null, '0');
INSERT INTO `t_user` VALUES ('6', '熊大', '123456', '审核员', '1');
INSERT INTO `t_user` VALUES ('7', '熊二', '123456', null, '0');
INSERT INTO `t_user` VALUES ('20', '光头强', '123456', null, '1');
INSERT INTO `t_user` VALUES ('21', '关羽', '123456', null, '0');
INSERT INTO `t_user` VALUES ('22', 'undefined', '123456', null, '0');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `video_content` varchar(255) DEFAULT NULL,
  `up_name` varchar(255) DEFAULT NULL,
  `video_time` varchar(255) DEFAULT NULL,
  `up_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '【S12全球总决赛】淘汰赛 10月30日 JDG vs T1', 'videos/video1.mp4', '哔哩哔哩英雄联盟赛事', '2022-10-31 17:22:08', 'uploads/2022110316161416458.jpg');
INSERT INTO `video` VALUES ('2', '一堂好课', 'videos/2022111018405611648.mp4', '追寻思想的力量', '2022-11-01 17:11:20', 'uploads/2022110114335812793.gif');
INSERT INTO `video` VALUES ('9', '测试视频1', 'videos/2022110814543011684.mp4', '张三', '2022-11-08 14:55:39', 'uploads/2022110114335812793.gif');
INSERT INTO `video` VALUES ('11', '测试视频2', 'videos/2022110819580215035.mp4', '法外狂徒', '2022-11-08 19:58:07', null);
INSERT INTO `video` VALUES ('12', '测试3', 'videos/2022110920131918774.mp4', '法外狂徒', '2022-11-09 20:13:22', null);
INSERT INTO `video` VALUES ('14', '测试4', 'videos/2022111018405611648.mp4', '鸭梨大', '2022-11-10 18:41:06', null);
