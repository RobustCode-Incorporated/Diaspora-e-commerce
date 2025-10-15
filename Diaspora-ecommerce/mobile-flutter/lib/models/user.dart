class User {
  final int id;
  final String name;
  final String email;
  String token; // ajouté pour stocker le token courant

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.token,
  });

  factory User.fromJson(Map<String, dynamic> json, String token) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      token: token,
    );
  }
}