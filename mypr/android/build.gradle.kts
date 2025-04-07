
// This is the build.gradle.kts file for the Android module of a Flutter project.
plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin") // Flutter Gradle Plugin
    id("com.google.gms.google-services") // Google Services plugin for Firebase
}
// Ensure the Flutter Gradle Plugin is applied after the Android and Kotlin plugins
flutter {
    source = "../.." // Path to the Flutter project root
}
// Make sure to apply the Google Services plugin after the Flutter Gradle Plugin
// This is necessary for Firebase to work correctly in the Android project.
// If you have any custom configurations for the Google Services plugin, add them here.
// If you have a custom google-services.json file, make sure it's in the correct location

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://storage.googleapis.com/download.flutter.io") }
    }
}

buildscript {
     repositories {
        google()
        mavenCentral()
        maven(url = "https://storage.googleapis.com/download.flutter.io")
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.0.2")
        classpath("com.google.gms:google-services:4.3.10")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.7.10")
    }
}

android {
    namespace = "com.example.mypr"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.mypr"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    buildTypes {
        release {
            isMinifyEnabled = true // Enable code shrinking
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.7.10")
    implementation("androidx.core:core-ktx:1.6.0")
    implementation("androidx.appcompat:appcompat:1.3.1")
    implementation("com.google.android.material:material:1.4.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.4.0")
    implementation("androidx.activity:activity-compose:1.3.1")
    implementation("com.google.firebase:firebase-analytics:19.0.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test:1.9.24")
    testImplementation("org.mockito:mockito-core:4.8.0")
}
