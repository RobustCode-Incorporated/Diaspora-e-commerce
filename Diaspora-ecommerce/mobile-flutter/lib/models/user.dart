class User {
  final int id;
  final String name;
  final String email;
  String token; // pour stocker le token courant

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.token,
  });

  factory User.fromJson(Map<String, dynamic> json, String token) {
    return User(
      id: json['id'] ?? 0,
      name: json['name'] ?? json['nom'] ?? '',
      email: json['email'] ?? '',
      token: token,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'token': token,
    };
  }
}