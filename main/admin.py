from django.contrib import admin
from .models import Shuju


@admin.register(Shuju)
class ShujuAdmin(admin.ModelAdmin):
    list_display = ('lianxiren', 'lianxidianhua', 'dianziyoujian', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('lianxiren', 'lianxidianhua', 'dianziyoujian')
