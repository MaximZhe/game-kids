<?php

$_POST= json_decode(file_get_contents("php://input"), true);

$name = $_POST["name"]; // Получаем значение Имя пользователя
$id = $_POST["id"]; //Получаем значение id

// Если отправка проходит удачно то отправляем json объект в ответ с сервера
if (isset($_POST))  
{
    echo json_encode(array("name" => $name, "id" => $id));
}
$id = (int)$id; // Преобразуем строку в число

$contents = file_get_contents('users.json'); // Мы загрузили содержимое нашего файла.

//Мы декодировали строку, это позволяет нам изменять данные.
$contentsDecoded = json_decode($contents, true); 

//Переменная с данными из input
$newContent = [
  'name'=> "$name",
  'id' => $id,
];

//Мы добавили новое содержимое в нужный нам массив в переменную contentsDecoded.
$contentsDecoded['users'][] = $newContent;


//Мы закодировали массив PHP обратно в строку JSON, используя json_encode.
$json = json_encode($contentsDecoded);

//Изменяем наш файл, заменив старое содержимое на новое и сохраняем файл в JSON.
file_put_contents('users.json', $json);

?>


