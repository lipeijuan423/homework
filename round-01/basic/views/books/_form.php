<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Books */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="books-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'book_ids')->textInput() ?>

    <?= $form->field($model, 'book_name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'book_price')->textInput() ?>

    <?= $form->field($model, 'book_introduce')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'book_date')->textInput() ?>

    <?= $form->field($model, 'book_author')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
