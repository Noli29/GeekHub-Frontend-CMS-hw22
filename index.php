<?php
$json = file_get_contents(__DIR__ . '/dump.json');

switch ($_GET['action']) {
    case 'get': {
        header('Content-type: application/json');
        echo $json;
    }
        break;

    case 'store': {
        $name = $_POST['name'];
        $json = json_decode($json, 1);
        $json[] = [
            'name' => $name,
            'status' => 0,
        ];

        $json = json_encode($json);

        file_put_contents(__DIR__ . '/dump.json', $json);
        header('Content-type: application/json');
        echo $json;
    }
        break;

    case 'delete': {
        $id = $_POST['task'];
        $json = json_decode($json, 1);
        unset($json[$id]);
        $json = json_encode($json);

        file_put_contents(__DIR__ . '/dump.json', $json);

        header('Content-type: application/json');
        echo "{}";
    }
        break;

    case 'complete': {
        $id = $_POST['task'];
        $json = json_decode($json, 1);
        $json[$id]['status'] = 1;
        $json = json_encode($json);

        file_put_contents(__DIR__ . '/dump.json', $json);

        header('Content-type: application/json');
        echo "{}";
    }
        break;

    default: {
        echo file_get_contents(__DIR__ . '/index.html');
    }
}