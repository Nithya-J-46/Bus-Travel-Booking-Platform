from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Location, Operator, Route, Bus, Booking, Passenger, Review
from .serializers import (
    LocationSerializer, OperatorSerializer, RouteSerializer, 
    BusSerializer, BookingSerializer, PassengerSerializer, ReviewSerializer
)

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'city', 'state', 'code']

class OperatorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Operator.objects.all()
    serializer_class = OperatorSerializer

class RouteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer

class BusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['bus_type', 'operator']
    ordering_fields = ['base_fare', 'departure_time']
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        from_city = request.query_params.get('from_city')
        to_city = request.query_params.get('to_city')
        date = request.query_params.get('date') # Format: YYYY-MM-DD
        
        if not from_city or not to_city:
            return Response({'error': 'from_city and to_city are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        queryset = self.get_queryset().filter(
            route__source__city__icontains=from_city,
            route__destination__city__icontains=to_city
        )
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
    @action(detail=True, methods=['get'])
    def seats(self, request, pk=None):
        bus = self.get_object()
        date = request.query_params.get('date')
        
        if not date:
            return Response({'error': 'date is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Get all booked seats for this bus on this date
        booked_passengers = Passenger.objects.filter(
            booking__bus=bus,
            booking__journey_date=date,
            booking__status__in=['upcoming', 'completed']
        )
        
        booked_seat_numbers = list(booked_passengers.values_list('seat_number', flat=True))
        
        return Response({
            'total_seats': bus.total_seats,
            'booked_seats': booked_seat_numbers
        })

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-created_at')

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
