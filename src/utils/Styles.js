import {StyleSheet} from 'react-native'; 

class Styles{
  static styles = StyleSheet.create({
    // Cargando datos
    loadingTitle:{
      alignSelf: "center"
    },
    //
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
    }

  })
}

export default Styles;