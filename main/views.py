import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Shuju


@csrf_exempt
def contact_api(request):
    if request.method != 'POST':
        return JsonResponse({'error': '仅支持 POST 请求'}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': '请求数据格式错误'}, status=400)

    name = data.get('name', '').strip()
    phone = data.get('phone', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()

    errors = {}
    if not name:
        errors['name'] = '请输入联系人'
    if not phone:
        errors['phone'] = '请输入联系电话'
    elif not phone.isdigit() or len(phone) != 11:
        errors['phone'] = '请输入正确的11位手机号'
    if not email:
        errors['email'] = '请输入电子邮件'
    elif '@' not in email or '.' not in email:
        errors['email'] = '请输入正确的邮箱地址'
    if not message:
        errors['message'] = '请输入要求说明'

    if errors:
        return JsonResponse({'error': errors}, status=400)

    Shuju.objects.create(
        lianxiren=name,
        lianxidianhua=phone,
        dianziyoujian=email,
        yaoqiushuoming=message
    )

    return JsonResponse({
        'success': True,
        'message': '感谢您的留言！我会尽快与您联系。'
    })
