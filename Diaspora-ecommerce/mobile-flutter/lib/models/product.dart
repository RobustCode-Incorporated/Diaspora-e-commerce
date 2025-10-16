class Product {
  final int id;
  final String name;
  final String description;
  final double price;
  final String? imageUrl;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    this.imageUrl,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] is int)
          ? (json['price'] as int).toDouble()
          : (json['price'] is double)
              ? json['price']
              : double.tryParse(json['price'].toString()) ?? 0.0,
      imageUrl: json['image_url'] != null
          ? 'http://localhost:4000/uploads/${json['image_url']}'
          : null,
    );
  }

  String formattedPrice() => '${price.toStringAsFixed(2)} €';
}