from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from server.serializer import ServerSerializer

list_server_docs = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="category",
            type= OpenApiTypes.STR,
            description="Category of the server",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="qty",
            type= OpenApiTypes.INT,
            description="Quantity of servers",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="by_user",
            type= OpenApiTypes.BOOL,
            description="Filter servers by user",
            location=OpenApiParameter.QUERY,
        ),
        OpenApiParameter(
            name="by_server_id",
            type= OpenApiTypes.INT,
            description="Filter servers by server id",
            location=OpenApiParameter.QUERY,
        ),
    ]
)