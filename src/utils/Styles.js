import {StyleSheet} from 'react-native'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  // Header
  header:{
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#0097A7",
    color: "#FF000F"
  },
  // Cargando datos
  loadingTitle:{
    alignSelf: "center"
  },
  // Account - Transactions
  section:{
    backgroundColor: "#B2EBF2",
    paddingHorizontal: 3,
    paddingVertical: 3,
    margin: 3
  },
  title:{
    fontWeight: "bold",
    fontSize: 15
  },
  sectionTitle:{
    fontWeight: "bold",
    fontSize: 18   
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
  }
})
export default styles;