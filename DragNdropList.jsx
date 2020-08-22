function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorMap = {};

const dummyData = Array.from(Array(200), (_, i) => {
  colorMap[i] = getRandomColor();
  return i;
});

export default function DragNdropList() {
  const [data, setData] = useState(dummyData);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colorMap[item],
              padding: 16,
              flexDirection: "row"
            }}
          >
            <View>
              <Text style={{ fontSize: 22 }}>@</Text>
            </View>
            <Text style={{ fontSize: 22, textAlign: "center", flex: 1 }}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={(item) => "" + item}
      />
    </View>
  );
}
