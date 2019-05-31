<?php
namespace app\models;

use Yii;
use yii\base\Model;

class BooksForm extends Model
{
  public $book_ids; // 数据库应该自增
  public $book_name; // viewd对应
  public $book_price;
  public $book_introduce;
  public $book_date;
  public $book_author;

  public function rules()
  {
    return [
      // 验证规则
      [['book_name', 'book_price', 'book_introduce','book_date','book_author'], 'required'],
    ];
  }
}

?>