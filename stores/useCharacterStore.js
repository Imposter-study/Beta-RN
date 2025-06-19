import { create } from "zustand";

const useCharacterStore = create((set) => ({
  title: "", // 제목
  description: "", // 상세설명
  character_image: null, // 캐릭터 이미지
  name: "", // 이름
  character_info: "", // 설명
  intro: [], // 첫 상황
  example_situation: [], // 상황 예시
  presentation: "", // 소개글?
  // 해시태그
  // 크리에이터 코멘트

  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setName: (newName) => set({ name: newName }),
  setCharacterInfo: (newCharacterInfo) =>
    set({ character_info: newCharacterInfo }),
  setImage: (newImage) => set({ character_image: newImage }),

  // 내용 초기화 함수
  resetCharacter: () =>
    set({
      title: "", // 제목
      description: "", // 상세설명
      character_image: null, // 캐릭터 이미지
      name: "", // 이름
      character_info: "", // 설명
      intro: [], // 첫 상황
      example_situation: [], // 상황 예시
      presentation: "", // 소개글?
      // 해시태그
      // 크리에이터 코멘트
    }),
}));

export default useCharacterStore;
