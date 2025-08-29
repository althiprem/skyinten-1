<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// DB connection
$host = "localhost";
$user = "root"; 
$pass = "";     
$dbname = "skyintern_db"; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Detect method
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $json = file_get_contents("php://input");
    $data = json_decode($json, true);
} elseif ($method === 'GET') {
    $data = $_GET;
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$action = $data['action'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$name = $data['name'] ?? '';

if ($action === "signup") {
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Signup successful", "user" => ["name" => $name, "email" => $email]]); 
    } else {
        echo json_encode(["success" => false, "message" => "Signup failed"]);
    }
    exit;
}

if ($action === "login") {
    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => ["id" => $row['id'], "name" => $row['name'], "email" => $email]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
    exit;
}

echo json_encode(["success" => false, "message" => "Invalid action"]);
?>
