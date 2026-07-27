from rest_framework import serializers
from .models import Location, Operator, Route, Bus, Booking, Passenger, Review

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    source = LocationSerializer(read_only=True)
    destination = LocationSerializer(read_only=True)
    source_id = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), source='source', write_only=True)
    destination_id = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), source='destination', write_only=True)
    
    class Meta:
        model = Route
        fields = '__all__'

class BusSerializer(serializers.ModelSerializer):
    operator = OperatorSerializer(read_only=True)
    route = RouteSerializer(read_only=True)
    operator_id = serializers.PrimaryKeyRelatedField(queryset=Operator.objects.all(), source='operator', write_only=True)
    route_id = serializers.PrimaryKeyRelatedField(queryset=Route.objects.all(), source='route', write_only=True)
    
    class Meta:
        model = Bus
        fields = '__all__'

class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['id', 'name', 'age', 'gender', 'seat_number']

class BookingSerializer(serializers.ModelSerializer):
    passengers = PassengerSerializer(many=True)
    bus = BusSerializer(read_only=True)
    bus_id = serializers.PrimaryKeyRelatedField(queryset=Bus.objects.all(), source='bus', write_only=True)
    
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'booking_id', 'created_at']

    def create(self, validated_data):
        passengers_data = validated_data.pop('passengers')
        user = self.context['request'].user
        validated_data['user'] = user
        
        # Generate a unique booking ID
        import uuid
        validated_data['booking_id'] = f"BKG{str(uuid.uuid4().hex[:8]).upper()}"
        
        booking = Booking.objects.create(**validated_data)
        for passenger_data in passengers_data:
            Passenger.objects.create(booking=booking, **passenger_data)
            
        return booking

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user', 'created_at']
