<?php
  use yii\helpers\Html;
  use yii\widgets\LinkPager;
  use yii\grid\GridView; // 数据小插件类
  use yii\grid\Column; // 显示类
  use yii\data\ActiveDataProvider;
?>
<h1>Books</h1>

<?= GridView::widget([
    'dataProvider' => $books,
    'columns' => [
      [
        'header' => '书名', // attribute
        'value' => 'book_name'
      ],
      [
        'header' => '作者',
        'value' => 'book_author'
      ],
      [
        'header' => '操作',
        // 'value' => function () {
        //     return Html::encode('操作');
        //   },
          'class' => 'yii\grid\ActionColumn', // 自带的查看和删除
          'template' => '{view} {update} {delete}',
          // 'buttons' => [
          //   'delete' => function ($url, $model, $key) {
          //     return Html::a('删除');
          //   }
          // ]
      ]
    ],
  ]);
?>

<?= LinkPager::widget(['pagination' => $pagination])?>