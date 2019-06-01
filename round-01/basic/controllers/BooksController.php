<?php
  namespace app\controllers;
  use Yii;
  use yii\web\Controller;
  use yii\data\Pagination;
  use app\models\Books;
  use app\models\BooksForm;
  use yii\data\ActiveDataProvider;
  use yii\base\Model;
  
  // use DateTime;
  // use yii\db\Query;

  class BooksController extends Controller 
  {
    public function actionIndex() 
    {
      $db_data = $this->findAllModel();
      return $this->render('index', [
        'books' => $db_data[0],
        'pagination' => $db_data[1],
      ]);
    }

    protected function findAllModel()
    {
        $query = Books::find(); // 生成查询语句,从Books表中取回所有数据
        // $books = $query->orderBy('book_name')->offset($pagination->offset)->limit($pagination->limit)->all();
        $books = new ActiveDataProvider([ // ?
          'query' => $query,
        ]);
        $pagination= new Pagination([
          'defaultPageSize' => 2,
          'totalCount' => $query->count(),
        ]);
        return [
          $books,
          $pagination
        ];
    }

    /* 
    * 编辑书的信息
    */
    public function editBook ($model) {
      if ($model['Books']) {
        $book_ids= Yii::$app->request->get('book_id');
        $dataModel  = $this->findModel($book_ids);
        $model = $model['Books'];
        // var_dump($model);
      } else {
        $dataModel = new Books;
      }
      
      $dataModel->book_name = $model['book_name'];
      $dataModel->book_price = $model['book_price'] ;
      $dataModel->book_introduce = $model['book_introduce'];
      $dataModel->book_date =  $model['book_date'];
      $dataModel->book_author = $model['book_author'];

      $dataModel->save();
    }


    /* 
    * 创建新书目录
    */
    public function actionCreate () 
    {
      $model = new BooksForm;

      if ($model -> load(Yii::$app->request->post()) && $model->validate()) {
       $db_data = $this->findAllModel();
        // 创建
        // $dataModel->book_ids =  $dataModel->getAutoIncreaseId();
        $this->editBook($model);
        // 地址
        return $this->redirect('index.php?r=books' );
      } else {
        return $this->render('form', [
          'model'=>$model
        ]);
      }
    }
    protected function findModel ($id)
    {
      $books = new Books();
      $db_data_one = $books::findOne($id);
      return $db_data_one;
    }
    /* 
    * 查看某一项书籍详情
    */
    public function actionUpdate () 
    {
      // 更新 地址
      // $model = new BooksForm;
      $book_ids= Yii::$app->request->get('book_id');
      $model  = $this->findModel($book_ids);

      if ($model -> load(Yii::$app->request->post()) && $model->validate()) {
        // 创建
        // $dataModel->book_ids =  $dataModel->getAutoIncreaseId();
        // 没有通过数组的方式
        $edit_data = Yii::$app->request->post();
        $this->editBook($edit_data);
        // 地址
        return $this->redirect('index.php?r=books');
      } else {
        $book_ids= Yii::$app->request->get('book_id');
        $db_data_one  = $this->findModel($book_ids);
        return $this->render('form', [
          'model' => $db_data_one
        ]);
      }
    }

    /* 
    * 删除数据
    */
    public function actionDelete () {
      $db_data = $this->findAllModel();
      $book_ids= Yii::$app->request->get('book_id');
      $db_data_one  = $this->findModel($book_ids);
      $db_data_one->delete();
      // The HTTP status code is invalid: Array --- redirect
      // render路径不对
      /* 
      [
          'model'=>$db_data,
           'books' => $db_data[0],
           'pagination' => $db_data[1],
        ]
      */
      return $this->redirect('index.php?r=books');
    }
  }
?>