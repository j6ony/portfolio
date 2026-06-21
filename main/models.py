from django.db import models


class Shuju(models.Model):
    lianxiren = models.CharField('联系人', max_length=100)
    lianxidianhua = models.CharField('联系电话', max_length=20)
    dianziyoujian = models.EmailField('电子邮件', max_length=254)
    yaoqiushuoming = models.TextField('要求说明')
    created_at = models.DateTimeField('创建时间', auto_now_add=True)

    class Meta:
        db_table = 'shuju'
        verbose_name = '联系表单数据'
        verbose_name_plural = '联系表单数据'

    def __str__(self):
        return f'{self.lianxiren} - {self.lianxidianhua}'
