import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  gender: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = "my-fake-token";
const dummyUser = {
  firstName: "Samad",
  surname: "Ibrahim",
  email: "contact@ultrasamad.com",
  phone: "+233 234 5678",
  dob: "1990-01-01",
  address: "25 MOI WE RD, Dansoman",
  gender: "Male",
  avatar: "https://i.pravatar.cc/100",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(dummyUser);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        setIsAuthenticated(!!token);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem(TOKEN_KEY, "my-fake-token");
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
