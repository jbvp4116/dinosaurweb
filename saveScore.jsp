<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
Game Over!<br>
<%
String score = request.getParameter("score");
out.println("내 점수: " + score);%>
</body>
</html>