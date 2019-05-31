<?php
  use yii\helpers\Html;
  use yii\widgets\ActiveForm;

  $form = ActiveForm::begin([
    'id' => 'create-form',
    'options' => ['class' => 'form-books'],
  ])
?>

<?= $form->field($model, 'book_name')->textInput()->label('书名')?>
<?= $form->field($model, 'book_author')->textInput()->label('作者')?>
<?= $form->field($model, 'book_introduce')->textInput()->label('介绍')?>
<?= $form->field($model, 'book_date')->textInput()->label('日期')?>
<?= $form->field($model, 'book_price')->textInput()->label('价格')?>



<div class="form-group">
    <div class="col-lg-offset-1 col-lg-11">
      <?= Html::submitButton('create', ['class' => 'btn btn-submit'])?>
    </div>
</div>

<?php ActiveForm::end()?>