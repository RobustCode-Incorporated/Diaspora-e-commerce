import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool loading = false;

  Future<void> handleRegister() async {
    setState(() => loading = true);

    try {
      final res = await http.post(
        // ⚠️ Mets ton IP locale ici si tu testes sur simulateur (ex: 10.0.2.2 pour Android)
        Uri.parse('http://localhost:4000/api/citoyens/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'nom': _nameController.text.trim(),
          'prenom': '',
          'username': _emailController.text.trim().split('@')[0],
          'email': _emailController.text.trim(),
          'password': _passwordController.text.trim(),
          'role': 'citoyen',
        }),
      );

      if (res.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Inscription réussie 🎉')),
        );
        Navigator.pop(context);
      } else {
        final error = json.decode(res.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error['message'] ?? 'Erreur inconnue')),
        );
      }
    } catch (err) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: $err')),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Créer un compte citoyen',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF0E2C5A),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 40),
                  TextField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'Nom complet',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 20),
                  TextField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      labelText: 'Email',
                      border: OutlineInputBorder(),
                    ),
                    keyboardType: TextInputType.emailAddress,
                  ),
                  SizedBox(height: 20),
                  TextField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      labelText: 'Mot de passe',
                      border: OutlineInputBorder(),
                    ),
                    obscureText: true,
                  ),
                  SizedBox(height: 30),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: loading ? null : handleRegister,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color(0xFF104B71),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: loading
                          ? CircularProgressIndicator(color: Colors.white)
                          : Text('S’inscrire',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold)),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextButton(
                    onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
                    child: Text(
                      "Déjà un compte ? Se connecter",
                      style: TextStyle(color: Color(0xFF0E2C5A)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}