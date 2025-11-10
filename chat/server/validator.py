import os

from PIL import Image
from django.core.exceptions import ValidationError


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 100 or img.height > 100:
                raise ValidationError("Image size should be less than 100x100")

def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.png', '.jpg', '.jpeg']
    if not ext.lower() in valid_extensions:
        raise ValidationError("Unsupported file extension. Only .png, .jpg, and .jpeg are allowed.")
