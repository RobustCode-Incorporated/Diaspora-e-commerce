import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:4000/api';

  // 🔹 Inscription citoyen
  static Future<User> registerCitizen(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/citoyens/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'name': name, 'email': email, 'password': password}),
    );

    if (response.statusCode == 201) {
      return User.fromJson(json.decode(response.body));
    } else {
      throw Exception(json.decode(response.body)['message'] ?? 'Erreur inscription');
    }
  }

  // 🔹 Login citoyen
  static Future<User> loginCitizen(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/citoyens/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return User.fromJson(json.decode(response.body));
    } else {
      throw Exception(json.decode(response.body)['message'] ?? 'Erreur login');
    }
  }
}import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:4000/api';

  // 🔹 Inscription citoyen
  static Future<User> registerCitizen(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/citoyens/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'name': name, 'email': email, 'password': password}),
    );

    if (response.statusCode == 201) {
      return User.fromJson(json.decode(response.body));
    } else {
      throw Exception(json.decode(response.body)['message'] ?? 'Erreur inscription');
    }
  }

  // 🔹 Login citoyen
  static Future<User> loginCitizen(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/citoyens/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return User.fromJson(json.decode(response.body));
    } else {
      throw Exception(json.decode(response.body)['message'] ?? 'Erreur login');
    }
  }
}