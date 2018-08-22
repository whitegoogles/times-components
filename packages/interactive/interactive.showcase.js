import "react-native";
import React from "react";
import { Dimensions, View } from "react-native";
import Interactive from "./src/interactive";
import InteractiveChris from "./src/interactive-chris";
import props from "./fixtures";

export default {
  name: "Primitives/Interactive",
  children: [
    {
      type: "story",
      name: "Default",
      component: ({ select }) => {
        const value = select(
          "Interactive",
          {
            audioPlayer: 'Audio Player',
            cardTimeline: 'Card Timeline',
            chapterHeading: 'Chapter Heading',
            dataWrapper: 'Data Wrapper for Charts and Maps',
            googleSheetTable: 'Google Sheets table',
            headline: 'Headline',
            inArticlePuff: 'In-article puffs',
            livefyre: 'Livefyre poll',
            matchScore: 'Opta - Match Score',
            matchStats: 'Opta - Match Stats',
            optaHub: 'Opta - Football hub',
            opinionary: 'Opinionary widgets',
            quiz: 'Quiz',
            quizMultipleRounds: 'Quiz - Multiple Rounds',
            responsiveGraphics: 'Responsive graphics (SVG)',
            storymap: 'Storymap',
            verticalTimelines: 'Vertical Timelines'
          },
          'storymap'
        );

        return (
          <View>
            {Object.keys(props).map((key, index) => {
              return (
                <View key={`${key}-${index}`} style={value === key ? {display: 'flex'} : {display: 'none'}}>
                  <Interactive
                    {...props[key]}
                    height={Dimensions.get("window").height}
                  />
                </View>
              );
            })}
          </View>
        );
      }
    },
    {
      type: "story",
      name: "Chris Lambda",
      component: () => {
        return (
          <InteractiveChris />
        )
      }
    }
  ]
};
