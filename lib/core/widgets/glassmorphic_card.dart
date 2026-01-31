import 'dart:ui';
import 'package:flutter/material.dart';

/// Widget reutilizable que crea tarjetas con efecto Glassmorphism
/// (vidrio translúcido con efecto de desenfoque).
/// 
/// Este widget es ideal para crear interfaces modernas y premium,
/// especialmente atractivas para adolescentes.
class GlassmorphicCard extends StatelessWidget {
  /// Contenido hijo del widget
  final Widget child;
  
  /// Radio de borde de la tarjeta
  final double borderRadius;
  
  /// Intensidad del blur (1-20 recomendado)
  final double blurIntensity;
  
  /// Color de fondo con opacidad
  final Color backgroundColor;
  
  /// Grosor del borde
  final double borderWidth;
  
  /// Color del borde
  final Color borderColor;
  
  /// Padding interno
  final EdgeInsetsGeometry? padding;
  
  /// Margen externo
  final EdgeInsetsGeometry? margin;
  
  /// Ancho del widget
  final double? width;
  
  /// Alto del widget
  final double? height;
  
  const GlassmorphicCard({
    super.key,
    required this.child,
    this.borderRadius = 16.0,
    this.blurIntensity = 10.0,
    this.backgroundColor = const Color(0x40FFFFFF), // Blanco con 25% opacidad
    this.borderWidth = 1.5,
    this.borderColor = const Color(0x40FFFFFF), // Blanco con 25% opacidad
    this.padding,
    this.margin,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: margin,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(borderRadius),
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: blurIntensity,
            sigmaY: blurIntensity,
          ),
          child: Container(
            decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: BorderRadius.circular(borderRadius),
              border: Border.all(
                color: borderColor,
                width: borderWidth,
              ),
              // Sombra suave para profundidad
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 20,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            padding: padding ?? const EdgeInsets.all(16),
            child: child,
          ),
        ),
      ),
    );
  }
}

/// Variante oscura del GlassmorphicCard para fondos oscuros
class GlassmorphicCardDark extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final double blurIntensity;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? width;
  final double? height;
  
  const GlassmorphicCardDark({
    super.key,
    required this.child,
    this.borderRadius = 16.0,
    this.blurIntensity = 10.0,
    this.padding,
    this.margin,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return GlassmorphicCard(
      borderRadius: borderRadius,
      blurIntensity: blurIntensity,
      backgroundColor: const Color(0x30000000), // Negro con 19% opacidad
      borderColor: const Color(0x30FFFFFF), // Blanco con 19% opacidad
      padding: padding,
      margin: margin,
      width: width,
      height: height,
      child: child,
    );
  }
}

/// Variante compacta para elementos pequeños como badges
class GlassmorphicBadge extends StatelessWidget {
  final Widget child;
  final Color? backgroundColor;
  final Color? borderColor;
  
  const GlassmorphicBadge({
    super.key,
    required this.child,
    this.backgroundColor,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return GlassmorphicCard(
      borderRadius: 8.0,
      blurIntensity: 5.0,
      backgroundColor: backgroundColor ?? const Color(0x50FFFFFF),
      borderColor: borderColor ?? const Color(0x50FFFFFF),
      borderWidth: 1.0,
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: child,
    );
  }
}
