<?php
  use yii\helpers\Html;
  use yii\widgets\LinkPager;
  use yii\grid\GridView; // 数据小插件类
  use yii\grid\ActionColumn; // 显示类
  use yii\data\ActiveDataProvider;
?>
<h1>Books</h1>

<?= Html::a('创建', 'index.php?r=books/create', ['title'=>'创建'])?>

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
        'class' => 'yii\grid\ActionColumn', // buttons
        'header' => '操作',
        // 'value' => function () {
        //     return Html::encode('操作'); // 手动写编辑
        //   },
        // 'class' => 'yii\grid\ActionColumn', // 自带的查看和删除
        'template' => '{update} {delete}',
          'buttons' => [ // 重写?
            'update' => function ($url, $model, $key) {
              // update 相对地址定位
              // books/update
              return Html::a('编辑', ['update', 'book_id' => $model->book_ids], ['title'=>'编辑',]);
            },
            'delete' => function ($url, $model, $key) {
              return Html::a('删除', ['delete', 'book_id' => $model->book_ids], ['title'=>'删除']);
            }
          ]
      ]
    ],
  ]);
?>

<?= LinkPager::widget(['pagination' => $pagination])?>