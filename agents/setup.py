"""
Setup script for Python AI agents
"""
import subprocess
import sys
import os

def install_requirements():
    """Install required Python packages"""
    try:
        print("🐍 Installing Python dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Python dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def create_env_file():
    """Create .env file if it doesn't exist"""
    env_path = os.path.join(os.path.dirname(__file__), ".env")
    
    if not os.path.exists(env_path):
        print("📝 Creating .env file...")
        with open(env_path, "w") as f:
            f.write("""# Google Gemini AI Configuration
GEMINI_API_KEY=AIzaSyD_hCi_oDQADDH2MC_tGLrAu7hi9NfXUHE

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_campus_db
""")
        print("✅ .env file created")
    else:
        print("✅ .env file already exists")

def test_imports():
    """Test if all required modules can be imported"""
    try:
        print("🧪 Testing Python imports...")
        import google.generativeai
        import mysql.connector
        from dotenv import load_dotenv
        import json
        print("✅ All imports successful")
        return True
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up Python AI Agents...\n")
    
    # Change to agents directory
    os.chdir(os.path.dirname(__file__))
    
    # Install requirements
    if not install_requirements():
        return False
    
    # Create env file
    create_env_file()
    
    # Test imports
    if not test_imports():
        return False
    
    print("\n🎉 Python AI Agents setup complete!")
    print("\n📋 Next steps:")
    print("1. Ensure Python is in your system PATH")
    print("2. Test the agent: python api_server.py get_status")
    print("3. Run the Node.js server and test AI endpoints")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)