import { Text } from "react-native";

export const markdownRules = {
  paragraph: (node, children, parent, styles) => {
    const siblings = parent[0].children;
    const isLast = node.index === siblings[siblings.length - 1].index;

    return (
      <Text
        key={node.key}
        style={{ color: "white", marginBottom: isLast ? 0 : 16 }}
      >
        {children}
      </Text>
    );
  },

  em: (node, children, parent, styles) => (
    <Text key={node.key} style={{ fontStyle: "italic", color: "#ffffff80" }}>
      {children}
    </Text>
  ),

  bold: (node, children, parent, styles) => (
    <Text key={node.key} style={{ fontWeight: "bold", color: "white" }}>
      {children}
    </Text>
  ),
};
