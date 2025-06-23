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
  hashtag: [], // 해시태그
  // 크리에이터 코멘트

  setTitle: (newTitle) => set({ title: newTitle }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setName: (newName) => set({ name: newName }),
  setCharacterInfo: (newCharacterInfo) =>
    set({ character_info: newCharacterInfo }),
  setImage: (newImage) => set({ character_image: newImage }),
  setPresentation: (newPresentation) => set({ presentation: newPresentation }),

  setIntro: (newIntro) =>
    set((state) => ({ intro: [...state.intro, newIntro] })),
  deleteIntro: (id) =>
    set((state) => ({
      intro: state.intro.filter((element) => element.id !== id),
    })),
  editIntro: (id, newMessage) =>
    set((state) => ({
      intro: state.intro.map((item) =>
        item.id === id ? { ...item, message: newMessage } : item
      ),
    })),

  setHashtag: (newHashtag) =>
    set((state) => ({ hashtag: [...state.hashtag, newHashtag] })),
  deleteHashtag: (idx) =>
    set((state) => ({
      hashtag: state.hashtag.filter((_, index) => idx !== index),
    })),

  setExampleSituation: (newSituation) =>
    set((state) => ({
      example_situation: [...state.example_situation, newSituation],
    })),

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
