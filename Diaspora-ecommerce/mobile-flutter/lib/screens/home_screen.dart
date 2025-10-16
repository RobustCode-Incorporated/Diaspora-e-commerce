import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/user.dart';
import '../models/product.dart';

class HomeScreen extends StatefulWidget {
  final User user;
  HomeScreen({required this.user});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Product> products = [];
  List<Product> cart = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchProducts();
  }

  Future<void> fetchProducts() async {
    setState(() => loading = true);
    try {
      final res = await http.get(
        Uri.parse('http://localhost:4000/api/products'),
        headers: {'Content-Type': 'application/json'},
      );
      if (res.statusCode == 200) {
        final List data = json.decode(res.body);
        setState(() {
          products = data.map((p) => Product.fromJson(p)).toList();
        });
      } else {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('Erreur chargement produits')));
      }
    } catch (err) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Erreur: $err')));
    } finally {
      setState(() => loading = false);
    }
  }

  void addToCart(Product product) {
    setState(() => cart.add(product));
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text('${product.name} ajouté au panier')));
  }

  void logout() {
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Bienvenue ${widget.user.name}'),
        actions: [
          Stack(
            alignment: Alignment.center,
            children: [
              IconButton(icon: Icon(Icons.shopping_cart), onPressed: () {
                Navigator.pushNamed(context, '/cart', arguments: cart);
              }),
              if (cart.isNotEmpty)
                Positioned(
                  right: 8,
                  top: 8,
                  child: CircleAvatar(
                    radius: 10,
                    backgroundColor: Colors.red,
                    child: Text(cart.length.toString(), style: TextStyle(fontSize: 12, color: Colors.white)),
                  ),
                ),
            ],
          ),
          IconButton(icon: Icon(Icons.logout), onPressed: logout),
        ],
      ),
      body: loading
          ? Center(child: CircularProgressIndicator())
          : products.isEmpty
              ? Center(child: Text('Aucun produit disponible'))
              : RefreshIndicator(
                  onRefresh: fetchProducts,
                  child: ListView.builder(
                    padding: EdgeInsets.all(16),
                    itemCount: products.length,
                    itemBuilder: (context, index) {
                      final product = products[index];
                      return Card(
                        margin: EdgeInsets.only(bottom: 16),
                        child: Row(
                          children: [
                            Container(
                              width: 120,
                              height: 120,
                              color: Colors.grey[200],
                              child: product.imageUrl != null
                                  ? Image.network(
                                      Uri.encodeFull('http://localhost:4000/uploads/${product.imageUrl!}'),
                                      fit: BoxFit.cover,
                                      errorBuilder: (context, error, stackTrace) =>
                                          Icon(Icons.broken_image, size: 50),
                                    )
                                  : Icon(Icons.image_not_supported, size: 50),
                            ),
                            Expanded(
                              child: Padding(
                                padding: EdgeInsets.all(12),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(product.name, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                                    SizedBox(height: 6),
                                    Text(product.description),
                                    SizedBox(height: 6),
                                    Text('${product.price.toStringAsFixed(2)} €',
                                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                                    Align(
                                      alignment: Alignment.bottomRight,
                                      child: IconButton(
                                        icon: Icon(Icons.add_shopping_cart),
                                        onPressed: () => addToCart(product),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            )
                          ],
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}