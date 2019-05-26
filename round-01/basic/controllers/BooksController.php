<?php
  namespace app\controllers;

  use yii\web\Controller;
  use yii\data\Pagination;
  use app\models\Books;

  class BooksController extends Controller
  {
    public function actionIndex () 
    {
      $query = Books::find(); // 从books表查询
      $pagination = new Pagination([ // 限定分页
        'defaultPageSize' => 2,
        'totalCount' => $query->count(),
      ]);

      $books = $query->orderBy('book_name')
                    ->offset($pagination->offset)
                    ->limit($pagination->limit)
                    ->all();
      return $this->render('index', [
        'books' => $books,
        'pagination'=>$pagination,
      ]);
    }  
  }
?>