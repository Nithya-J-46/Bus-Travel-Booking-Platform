import random
from django.core.management.base import BaseCommand
from bookings.models import Location, Operator, Route, Bus

class Command(BaseCommand):
    help = 'Seeds the database with realistic bus travel data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Clear existing data
        Bus.objects.all().delete()
        Route.objects.all().delete()
        Operator.objects.all().delete()
        Location.objects.all().delete()
        
        # Create Locations
        locations_data = [
            {'name': 'Bangalore (Majestic)', 'city': 'Bangalore', 'state': 'Karnataka', 'code': 'BLR'},
            {'name': 'Mumbai (Borivali)', 'city': 'Mumbai', 'state': 'Maharashtra', 'code': 'BOM'},
            {'name': 'Delhi (ISBT)', 'city': 'Delhi', 'state': 'Delhi', 'code': 'DEL'},
            {'name': 'Chennai (Koyambedu)', 'city': 'Chennai', 'state': 'Tamil Nadu', 'code': 'MAA'},
            {'name': 'Hyderabad (MGBS)', 'city': 'Hyderabad', 'state': 'Telangana', 'code': 'HYD'},
            {'name': 'Goa (Panjim)', 'city': 'Goa', 'state': 'Goa', 'code': 'GOI'},
            {'name': 'Pune (Swargate)', 'city': 'Pune', 'state': 'Maharashtra', 'code': 'PNQ'},
        ]
        
        locations = {}
        for loc in locations_data:
            locations[loc['code']] = Location.objects.create(**loc)
            
        self.stdout.write(f'Created {Location.objects.count()} locations.')
        
        # Create Operators
        operators_data = [
            {'name': 'IntrCity SmartBus', 'rating': 4.8, 'fleet_size': 350},
            {'name': 'VRL Travels', 'rating': 4.6, 'fleet_size': 500},
            {'name': 'SRS Travels', 'rating': 4.5, 'fleet_size': 420},
            {'name': 'Orange Tours', 'rating': 4.7, 'fleet_size': 280},
        ]
        
        operators = []
        for op in operators_data:
            operators.append(Operator.objects.create(**op))
            
        self.stdout.write(f'Created {Operator.objects.count()} operators.')
        
        # Create Routes
        routes_data = [
            {'source': 'BLR', 'dest': 'BOM', 'dist': 980, 'dur': '16h 30m'},
            {'source': 'BLR', 'dest': 'MAA', 'dist': 350, 'dur': '6h 30m'},
            {'source': 'BLR', 'dest': 'HYD', 'dist': 570, 'dur': '9h 45m'},
            {'source': 'BLR', 'dest': 'GOI', 'dist': 590, 'dur': '12h 00m'},
            {'source': 'BOM', 'dest': 'PNQ', 'dist': 150, 'dur': '3h 30m'},
            {'source': 'BOM', 'dest': 'GOI', 'dist': 600, 'dur': '12h 30m'},
        ]
        
        routes = []
        for r in routes_data:
            # Create forward route
            routes.append(Route.objects.create(
                source=locations[r['source']],
                destination=locations[r['dest']],
                distance_km=r['dist'],
                estimated_duration=r['dur']
            ))
            # Create return route
            routes.append(Route.objects.create(
                source=locations[r['dest']],
                destination=locations[r['source']],
                distance_km=r['dist'],
                estimated_duration=r['dur']
            ))
            
        self.stdout.write(f'Created {Route.objects.count()} routes.')
        
        # Create Buses
        bus_types = ['ac_sleeper', 'non_ac_sleeper', 'ac_seater', 'volvo_semi']
        buses = 0
        
        for route in routes:
            # Create 3-5 buses per route
            num_buses = random.randint(3, 5)
            for _ in range(num_buses):
                operator = random.choice(operators)
                bus_type = random.choice(bus_types)
                
                # Generate random time
                hour = random.randint(6, 22)
                minute = random.choice([0, 15, 30, 45])
                dept_time = f"{hour:02d}:{minute:02d}:00"
                
                # Estimate arrival
                dur_parts = route.estimated_duration.split('h')
                hours_add = int(dur_parts[0])
                arr_hour = (hour + hours_add) % 24
                arr_time = f"{arr_hour:02d}:{minute:02d}:00"
                
                # Generate realistic fare based on distance and type
                fare_base = route.distance_km * (1.5 if 'ac' in bus_type else 1.0)
                if 'sleeper' in bus_type: fare_base *= 1.3
                fare = round(fare_base / 50) * 50 # round to nearest 50
                
                Bus.objects.create(
                    operator=operator,
                    route=route,
                    bus_type=bus_type,
                    total_seats=40 if 'sleeper' in bus_type else 45,
                    departure_time=dept_time,
                    arrival_time=arr_time,
                    base_fare=fare
                )
                buses += 1
                
        self.stdout.write(f'Created {buses} buses.')
        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
