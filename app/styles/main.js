import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50
  },
  mainContainer: {
    flex: 1
  },
  headerBG: {
    backgroundColor: 'steelblue'
  },
  headerBold: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  input_large: {
    width: 250,
    height: 250,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 40,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#eee",
  },
  layerTop: {
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  layer1: {
    flex: 4,
    alignItems: "center",
    padding: 20,
  },
  layer2: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'powderblue'
  },
  layer3: {
    flex: 1,
    flexDirection: "row",
  },
  layer4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21618C",
  },
  layer5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "steelblue",
  },
  layer6: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAD7A0'
  },
  body: {
    textAlign: "justify",
  },
  footer: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  flatList: {
    width: '100%',
  },
  postListItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    margin: 14,
    padding: 10,
    backgroundColor: '#fff'
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  postSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 8,
    marginBottom: 8
  },
  postSeparatorLg: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginTop: 40,
    marginBottom: 8
  },
  postButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  postButton2x: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
    marginBottom: 20
  },
  img_logo: {
    width: 262,
    height: 48,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'steelblue',
    marginTop: 40,
    marginBottom: 30,
    width: 200
  },
  separatorH: {
    width: 10
  },
  textSecundary: {
    fontStyle: 'italic'
  },
  customButton: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#1E8449',
    borderRadius: 3
  },
  customButtonCancel: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#C0392B',
    borderRadius: 3
  },
  customButtonText: {
    textAlign: 'center',
    padding: 10,
    color: '#EAFAF1',
    textTransform: 'uppercase'
  },
  customButtonEdit: {
    textAlign: 'right',
    padding: 10,
    margin: 4,
    backgroundColor: '#FAD7A0',
    borderRadius: 4,
  },
  customButtonEditText: {
    color: '#935116',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  customButtonEditIcon: {
    color: '#935116',
    fontSize: 14
  }
});


export default styles;