<?php
  namespace app\controllers;
  use yii\web\Controller;
  use yii\data\Pagination;
  use app\models\Books;
  use yii\data\ActiveDataProvider;
  // use yii\db\Query;

  class BooksController extends Controller 
  {
    public function actionIndex() 
    {
      $query = Books::find(); // 生成查询语句,从Books表中取回所有数据

      $pagination= new Pagination([
        'defaultPageSize' => 2,
        'totalCount' => $query->count(),
      ]);
      // offset limit确保返回一页数据
      //ArrayDataProvider
      // $books = $query->orderBy('book_name')->offset($pagination->offset)->limit($pagination->limit)->all();
      $books = new ActiveDataProvider([ // ?
        'query' => $query,
      ]);
      
      return $this->render('index', [
        'books' => $books,
        'pagination' => $pagination,
      ]);
    }
  }
?>