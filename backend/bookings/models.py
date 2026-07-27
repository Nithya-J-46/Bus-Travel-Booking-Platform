from django.db import models
from django.conf import settings

class Location(models.fields.CharField):
    pass # Wait, standard model creation

class Location(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True, null=True, blank=True)

    def __str__(self):
        return f"{self.name}, {self.city}"

class Operator(models.Model):
    name = models.CharField(max_length=150)
    logo = models.ImageField(upload_to='operators/', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    fleet_size = models.IntegerField(default=1)

    def __str__(self):
        return self.name

class Route(models.Model):
    source = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='source_routes')
    destination = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='dest_routes')
    distance_km = models.IntegerField()
    estimated_duration = models.CharField(max_length=50) # e.g. "8h 30m"

    def __str__(self):
        return f"{self.source.name} to {self.destination.name}"

class Bus(models.Model):
    BUS_TYPES = [
        ('ac_sleeper', 'A/C Sleeper'),
        ('non_ac_sleeper', 'Non A/C Sleeper'),
        ('ac_seater', 'A/C Seater'),
        ('non_ac_seater', 'Non A/C Seater'),
        ('volvo_semi', 'Volvo Multi-Axle A/C Semi Sleeper')
    ]

    operator = models.ForeignKey(Operator, on_delete=models.CASCADE, related_name='buses')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='buses')
    bus_type = models.CharField(max_length=50, choices=BUS_TYPES)
    total_seats = models.IntegerField(default=40)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    base_fare = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.operator.name} - {self.get_bus_type_display()}"

class Booking(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded')
    ]

    booking_id = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='bookings')
    journey_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.booking_id

class Passenger(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='passengers')
    name = models.CharField(max_length=150)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    seat_number = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name} - Seat {self.seat_number}"

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='reviews', null=True, blank=True)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=5)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.email} for {self.bus.operator.name}"
