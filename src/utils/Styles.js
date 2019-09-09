import {StyleSheet} from 'react-native'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  // Header
  header:{
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#0097A7"
  },
  stellarTitle: {
    color: "#fff",
    marginHorizontal:30,
    fontSize: 23
  },
  // Cargando datos
  loadingTitle:{
    alignSelf: "center"
  },
  // Account - Transactions
  section:{
    backgroundColor: "#B2EBF2",
    margin: 3,
    padding: 15
  },
  title:{
    fontWeight: "bold",
    fontSize: 15
  },
  sectionTitle:{
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold', 
  },
  // Home
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    // backgroundColor: Colors.white,
    backgroundColor: Platform.select({
      ios: Colors.white,
      android: Colors.white
    }),
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    flex: 1,
  },
  copied:{
    padding: 10,
    backgroundColor: "#0097A7",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center"
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  }
})
export default styles;