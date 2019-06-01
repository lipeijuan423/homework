<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "books".
 *
 * @property int $book_ids
 * @property string $book_name
 * @property double $book_price
 * @property string $book_introduce
 * @property string $book_date
 * @property string $book_author
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['book_name', 'book_price', 'book_date', 'book_author'], 'required'],
            [['book_price'], 'number'],
            [['book_date'], 'safe'],
            [['book_name', 'book_introduce', 'book_author'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'book_ids' => 'Book Ids',
            'book_name' => 'Book Name',
            'book_price' => 'Book Price',
            'book_introduce' => 'Book Introduce',
            'book_date' => 'Book Date',
            'book_author' => 'Book Author',
        ];
    }
}
