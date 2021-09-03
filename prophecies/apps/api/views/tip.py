from rest_framework import filters, viewsets
from rest_framework_json_api import serializers
from rest_framework_json_api.relations import ResourceRelatedField
from prophecies.core.models import Tip
from prophecies.apps.api.views.project import ProjectSerializer
from prophecies.apps.api.views.user import UserSerializer
from prophecies.apps.api.views.task import TaskSerializer

class TipSerializer(serializers.HyperlinkedModelSerializer):
    project = ResourceRelatedField(many=False, read_only=True)
    creator = ResourceRelatedField(many=False, read_only=True)
    task = ResourceRelatedField(many=False, read_only=True)

    included_serializers = {
        'creator': UserSerializer,
        'project': ProjectSerializer,
        'task': TaskSerializer
    }

    class JSONAPIMeta:
        included_resources = ['creator', 'project', 'task']

    class Meta:
        model = Tip
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'project', 'creator', 'task']

class TipViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tip.objects.all() \
        .prefetch_related('project') \
        .prefetch_related('creator') \
        .prefetch_related('task')
    serializer_class = TipSerializer
    search_fields = ['name', 'description']
    ordering_fields = ['name']
    filterset_fields = ['name', 'project', 'task', 'creator']
    pagination_class = None
    ordering = ['-id']
