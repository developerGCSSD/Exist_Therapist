import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import PrimaryButton from './primaryButton';
import SecondaryButton from './secondaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OnlineMethodIcon from '../assets/icons/onlineMethod';
import FaceToFaceMethodIcon from '../assets/icons/faceToFaceMethod';
import InputField from './inputField';
import { useDispatch } from 'react-redux';
import { updateClientSessionState } from '../Features/todaySchedule/clientSessionStateSlice';

export default function TodayScheduleCard({
  id,
  name,
  status,
  method,
  noShow,
  sessionEnded,
  sessionEndedEarly,
  onStart,
  onNoShow,
  onEndSession,
  onEndEarly,
  disableActions,
  waitingForOnlineStart,
  reservationStatus,
  showReservationStatus,
}) {
  const [started, setStarted] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [modalType, setModalType] = useState('end'); // 'end' or 'early'
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [duration, setDuration] = useState('');
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null); // 'physical' | 'mental' | null
  const dispatch = useDispatch();

  const handleStart = () => {
    setStarted(true);
    onStart?.();
  };

  const handleEndSession = () => {
    setModalType('end');
    setShowEndSessionModal(true);
  };

  const confirmEndSession = () => {
    setStarted(false);
    setShowEndSessionModal(false);
    onEndSession?.();

    if (method?.toLowerCase() === 'online') {
      dispatch(
        updateClientSessionState({
          clientId: id,
          state: 'Session Completed',
          date: moment().format('MM/DD/YYYY'),
        }),
      );
    }
  };

  const handleEndEarly = () => {
    setModalType('early');
    setShowEndSessionModal(true);
  };

  const handleNoShow = () => {
    setModalType('noShow');
    setShowEndSessionModal(true);
  };

  const getReservationStatusStyle = (status, method) => {
    const faceToFaceStatuses = {
      'Pending Confirmation': {
        badgeStyle: styles.endedEarlyBadge,
        textStyle: styles.endedEarlyText,
      },
      'Checked Out': {
        badgeStyle: styles.noShowBadge,
        textStyle: styles.noShowText,
      },
      defaultCompleted: [
        'Arrival Confirmed',
        'Appointment Confirmed',
        'Availability Confirmed',
        'Check-In Confirmed',
      ],
    };

    const onlineStatuses = {
      'Pending No Show': {
        badgeStyle: styles.noShowBadge,
        textStyle: styles.noShowText,
      },
      'Pending Not Completed': {
        badgeStyle: styles.endedEarlyBadge,
        textStyle: styles.endedEarlyText,
      },
      OnlineFollowUp: {
        badgeStyle: styles.completedBadge,
        textStyle: styles.completedText,
      },
    };

    if (method?.toLowerCase() === 'face to face') {
      if (faceToFaceStatuses[status]) {
        return faceToFaceStatuses[status];
      } else if (faceToFaceStatuses.defaultCompleted.includes(status)) {
        return {
          badgeStyle: styles.completedBadge,
          textStyle: styles.completedText,
        };
      }
    } else if (method?.toLowerCase() === 'online') {
      if (onlineStatuses[status]) {
        return onlineStatuses[status];
      }
    }

    return {
      badgeStyle: styles.reservationStatusBadge,
      textStyle: styles.reservationStatusText,
    };
  };

  const physicalHealthData = [
    {
      question: 'Do you suffer from any medical problems?',
      answer: 'Diabetes and blood pressure',
    },
    {
      question: 'List current medication:',
      answer: 'Metformin, insulin glargine',
    },
    {
      question: 'Doctors Name',
      answer: 'Doctor name',
    },
    {
      question: 'Telephone number',
      answer: '+2010985958952',
    },
    {
      question: 'Do you exercise?  How much? Since when?',
      answer: 'Yes, three times , 2022',
    },
    {
      question: 'Do you Smoke?  How much? Since when?',
      answer: 'Yes, three times , 2022',
    },
    {
      question: 'Do you drink?  How much? Since when?',
      answer: 'Yes, three times , 2022',
    },
    {
      question: 'Do you take a drugs?  How much? Since when? What kind?',
      answer: 'Yes, three times , 2022',
    },
  ];

  const mentalHealthData = [
    {
      question: 'Have you ever been diagnosed with a mental health condition?',
      answer: 'Yes, anxiety disorder',
    },
    {
      question: 'Are you currently receiving treatment?',
      answer: 'Yes, attending therapy once a week',
    },
    {
      question: 'Have you ever taken psychiatric medication?',
      answer: 'Yes, fluoxetine',
    },
    {
      question: 'Do you have a history of trauma?',
      answer: 'Yes, childhood trauma',
    },
    {
      question: 'Do you experience mood swings?',
      answer: 'Occasionally',
    },
    {
      question: 'Do you have thoughts of self-harm or suicide?',
      answer: 'No',
    },
  ];

  return (
    <>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            {status === 'First' && (
              <>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.status}>New</Text>
              </>
            )}
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.svgIconWrapper}>
              {method === 'Face To Face' ? (
                <FaceToFaceMethodIcon width={24} height={24} />
              ) : (
                <OnlineMethodIcon width={24} height={24} />
              )}
            </View>

            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.buttonsContainer}>
            {showReservationStatus ? (
              (() => {
                const { badgeStyle, textStyle } = getReservationStatusStyle(
                  reservationStatus,
                  method,
                );
                return (
                  <View style={badgeStyle}>
                    <Text style={textStyle}>{reservationStatus}</Text>
                  </View>
                );
              })()
            ) : waitingForOnlineStart ? (
              <View style={styles.waitingBadge}>
                <Text style={styles.waitingText}>{reservationStatus}</Text>
              </View>
            ) : disableActions ? (
              <View style={styles.notAvailableBadge}>
                <Text style={styles.notAvailableText}>{reservationStatus}</Text>
              </View>
            ) : method === 'faceToFace' ? (
              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>Appointment Confirmed</Text>
              </View>
            ) : noShow ? (
              <View style={styles.noShowBadge}>
                <Text style={styles.noShowText}>No Show</Text>
              </View>
            ) : sessionEndedEarly ? (
              <View style={styles.endedEarlyBadge}>
                <Text style={styles.endedEarlyText}>Session Ended Early</Text>
              </View>
            ) : sessionEnded ? (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Session Completed</Text>
              </View>
            ) : method?.toLowerCase() === 'online' ? (
              started ? (
                <>
                  <PrimaryButton
                    title="End Session"
                    onPress={handleEndSession}
                    width="48%"
                    height={40}
                    fontSize={14}
                  />
                  <SecondaryButton
                    title="End Early"
                    onPress={handleEndEarly}
                    width="48%"
                    height={40}
                    fontSize={14}
                  />
                </>
              ) : (
                <>
                  <PrimaryButton
                    title="Start"
                    onPress={handleStart}
                    width="48%"
                    height={35}
                    fontSize={14}
                  />
                  <SecondaryButton
                    title="No show"
                    onPress={handleNoShow}
                    width="48%"
                    height={35}
                    fontSize={14}
                  />
                </>
              )
            ) : (
              (() => {
                const { badgeStyle, textStyle } = getReservationStatusStyle(
                  reservationStatus,
                  method,
                );
                return (
                  <View style={badgeStyle}>
                    <Text style={textStyle}>{reservationStatus}</Text>
                  </View>
                );
              })()
            )}
          </View>

          <TouchableOpacity
            style={styles.intakeWrapper}
            onPress={() => setShowIntakeModal(true)}
          >
            <Text style={styles.intakeLink}>Intake</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={showEndSessionModal}
        onRequestClose={() => setShowEndSessionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowEndSessionModal(false)}
          />
          <View style={styles.modalContent}>
            <View style={styles.modalContentInner}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalTitleRow}>
                  <Text style={styles.modalHeaderBlue}>
                    {modalType === 'noShow' ? 'No Show : ' : 'End Session : '}
                  </Text>
                  <Text style={styles.modalHeaderName}>{name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowEndSessionModal(false)}
                  style={styles.closeIconWrapper}
                >
                  <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalIconWrapper}>
                <Ionicons name="warning-outline" size={40} color="#fff" />
              </View>

              <View>
                <Text style={styles.modalTextBlack}>
                  {modalType === 'noShow'
                    ? 'Mark this patient as a no-show?\n'
                    : modalType === 'early'
                    ? 'End session early?\n'
                    : 'End session now?\n'}
                </Text>
                <Text style={styles.modalTextGrey}>
                  {modalType === 'noShow'
                    ? "You're about to mark this patient as absent.\nPlease confirm they did not attend the session."
                    : modalType === 'early'
                    ? "You're ending this session before the scheduled time. This session will be marked as incomplete."
                    : "You're about to end the session. Make sure the session has been completed before confirming."}
                </Text>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <SecondaryButton
                title="Cancel"
                onPress={() => setShowEndSessionModal(false)}
                width="48%"
                height={42}
              />
              <PrimaryButton
                title={
                  modalType === 'noShow'
                    ? 'Confirm'
                    : modalType === 'early'
                    ? 'End session early'
                    : 'End Session'
                }
                onPress={
                  modalType === 'noShow'
                    ? () => {
                        setShowEndSessionModal(false);
                        setStarted(false);
                        onNoShow?.();
                        if (method?.toLowerCase() === 'online') {
                          dispatch(
                            updateClientSessionState({
                              clientId: id,
                              state: 'No show',
                              date: moment().format('MM/DD/YYYY'),
                            }),
                          );
                        }
                      }
                    : modalType === 'early'
                    ? () => {
                        setShowEndSessionModal(false);
                        setTimeout(() => {
                          setShowDurationModal(true);
                        }, 300);
                      }
                    : confirmEndSession
                }
                width="48%"
                height={42}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="slide"
        visible={showDurationModal}
        onRequestClose={() => setShowDurationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowDurationModal(false)}
          />
          <View style={styles.durationModalContent}>
            <View style={styles.modalContentInner}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalTitleRow}>
                  <Text style={styles.modalHeaderBlue}>
                    End Session Early :{' '}
                  </Text>
                  <Text style={styles.modalHeaderName}>{name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowDurationModal(false)}
                  style={styles.closeIconWrapper}
                >
                  <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
              </View>

              <Text style={styles.durationModalText}>
                How much time is needed in minutes to complete the session?
              </Text>

              <View style={{ width: '100%', marginTop: 20 }}>
                <InputField
                  placeholder="e.g. 30"
                  value={duration}
                  onChangeText={text => {
                    if (/^\d*$/.test(text)) setDuration(text);
                  }}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <PrimaryButton
                title="Confirm"
                onPress={() => {
                  setStarted(false);
                  setShowDurationModal(false);
                  onEndEarly?.(parseInt(duration, 10));

                  if (method?.toLowerCase() === 'online') {
                    dispatch(
                      updateClientSessionState({
                        clientId: id,
                        state: 'Session Ended Early',
                        date: moment().format('MM/DD/YYYY'),
                        RemainingTime: parseInt(duration, 10),
                      }),
                    );
                  }
                }}
                width="100%"
                height={42}
                disabled={
                  !duration || isNaN(duration) || parseInt(duration, 10) <= 0
                }
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        animationType="slide"
        visible={showIntakeModal}
        onRequestClose={() => setShowIntakeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setShowIntakeModal(false)}
          />
          <View style={styles.intakeModal}>
            <View style={styles.modalHandle} />
            <TouchableOpacity
              style={styles.modalCloseIcon}
              onPress={() => setShowIntakeModal(false)}
            >
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>

            <View style={styles.patientInfoRow}>
              <Text style={styles.patientInfoLabel}>Patient info : </Text>
              <Text style={styles.patientInfoName}>{name}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                setExpandedSection(
                  expandedSection === 'physical' ? null : 'physical',
                )
              }
              style={styles.intakeSection}
            >
              <Text style={styles.intakeSectionText}>Physical Health</Text>
              <Ionicons
                name={
                  expandedSection === 'physical' ? 'chevron-up' : 'chevron-down'
                }
                size={20}
              />
            </TouchableOpacity>

            {expandedSection === 'physical' && (
              <View style={styles.scrollWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {physicalHealthData.map((item, index) => (
                    <View key={index} style={styles.qaBlock}>
                      <Text style={styles.questionText}>• {item.question}</Text>
                      <View style={styles.answerBox}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            <TouchableOpacity
              onPress={() =>
                setExpandedSection(
                  expandedSection === 'mental' ? null : 'mental',
                )
              }
              style={styles.intakeSection}
            >
              <Text style={styles.intakeSectionText}>Mental Health</Text>
              <Ionicons
                name={
                  expandedSection === 'mental' ? 'chevron-up' : 'chevron-down'
                }
                size={20}
              />
            </TouchableOpacity>
            {expandedSection === 'mental' && (
              <View style={styles.scrollWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {mentalHealthData.map((item, index) => (
                    <View key={index} style={styles.qaBlock}>
                      <Text style={styles.questionText}>• {item.question}</Text>
                      <View style={styles.answerBox}>
                        <Text style={styles.answerText}>{item.answer}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
    width: '95%',
    alignSelf: 'flex-end',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  dot: {
    fontSize: 20,
    marginHorizontal: 4,
    color: '#333',
  },
  status: {
    color: '#3463E9',
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  intakeWrapper: {
    width: '20%',
    alignItems: 'flex-end',
  },
  intakeLink: {
    color: '#3463E9',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgIconWrapper: {
    borderRadius: 100,
    padding: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    height: '40%',
    display: 'flex',
  },
  durationModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    height: '35%',
    display: 'flex',
  },

  modalContentInner: {
    flex: 1,
    alignItems: 'center',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderBlue: {
    color: '#3463E9',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalHeaderName: {
    fontWeight: '500',
    fontSize: 16,
  },
  closeIconWrapper: {
    padding: 4,
    marginTop: 2,
  },
  modalIconWrapper: {
    backgroundColor: '#F8AA4C',
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: '#FFD39E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTextBlack: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  durationModalText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },

  modalTextGrey: {
    color: '#777',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  noShowBadge: {
    backgroundColor: '#FEF0F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noShowText: {
    color: '#D50B3E',
    fontWeight: '600',
    fontSize: 14,
  },
  completedBadge: {
    backgroundColor: '#EEFBF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#17663A',
    fontWeight: '600',
    fontSize: 14,
  },
  endedEarlyBadge: {
    backgroundColor: '#FFF2EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endedEarlyText: {
    color: '#B82E00',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmedBadge: {
    backgroundColor: '#EEFBF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedText: {
    color: '#17663A',
    fontWeight: '600',
    fontSize: 14,
  },
  notAvailableBadge: {
    backgroundColor: '#EAF4FF', // light grey
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAvailableText: {
    color: '#1D4ED8', // muted text
    fontWeight: '600',
    fontSize: 10,
  },
  waitingBadge: {
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingText: {
    color: '#1D4ED8', // blue tone
    fontWeight: '600',
    fontSize: 10,
  },
  intakeModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    height: '90%',
  },

  modalHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },

  modalCloseIcon: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 1,
  },

  intakeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  intakeSectionText: {
    fontSize: 16,
    fontWeight: '600',
  },

  scrollArea: {
    maxHeight: 150,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  patientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  patientInfoLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  patientInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3463E9', // blue
  },
  scrollWrapper: {
    height: '70%',
    paddingTop: 8,
    marginBottom: 14,
  },

  qaBlock: {
    marginBottom: 16,
  },

  questionText: {
    fontSize: 14,
    color: '#6B6B8D', // muted purple-ish
    marginBottom: 6,
  },

  answerBox: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  answerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
